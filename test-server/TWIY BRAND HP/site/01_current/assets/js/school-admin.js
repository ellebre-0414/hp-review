(() => {
  const model=globalThis.TWIY_SCHOOL_MODEL, api=globalThis.TWIY_SCHOOL_DATA;
  const $=id=>document.getElementById(id);
  let draft=null, revision=0, dirty=false, working=false, authenticated=false;
  const editableFields=model.fields.filter(field=>!field.retired);
  const groups=[...new Set(['共通メニュー','概要',...editableFields.map(field=>field.group)]),...model.historyYears.map(year=>'沿革 '+year),'沿革・代表挨拶'];
  let overviewPart='students';
  groups.forEach(group=>$('school-edit-group').add(new Option(group,group)));
  function message(text,error=false) { $('school-admin-message').textContent=text; $('school-admin-message').dataset.error=String(error); }
  function busy(value) {
    working=value; $('school-editor-form').inert=value;
    for(const id of ['school-save','school-discard','school-logout','school-export','school-import'])$(id).disabled=value;
  }
  function changed() { dirty=true; $('school-save-state').textContent='未保存の変更があります'; }
  function renderOverviewEditor(container) {
    const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
    const button=(text,action)=>{const b=node('button','',text);b.type='button';b.addEventListener('click',action);return b;};
    const rerender=focus=>{changed();render();if(focus)$(focus)?.focus();};
    const help=node('p','school-overview-edit-help','説明欄は追加・並べ替え・削除できます。空欄は表示せず、前後を詰めます。項目内の説明がすべて空欄の場合は、その本文区画も非表示になります。上の構成図には5項目の名称だけ残ります。講師写真は掲載しません。');
    const label=node('label','','概要内の項目'),select=node('select');select.id='school-overview-part';label.htmlFor=select.id;
    [['students','対象生徒'],['hours','営業時間'],['lessons','授業形態'],['fees','料金'],['general','講師：全体の説明'],['people','講師：個人の説明']].forEach(([value,text])=>select.add(new Option(text,value)));
    select.value=overviewPart;select.addEventListener('change',()=>{overviewPart=select.value;render();$('school-overview-part').focus();});container.append(help,label,select);
    const fields=node('div','school-overview-edit-fields');container.append(fields);
    function descriptions(host,items,prefix) {
      items.forEach((text,index)=>{
        const row=node('fieldset','school-overview-edit-item');row.dataset.overviewItem=String(index);
        row.append(node('legend','','説明 '+(index+1)));
        const caption=node('label','','説明文'),input=node('textarea');input.id=prefix+'-'+index;caption.htmlFor=input.id;
        input.value=text;input.rows=3;input.maxLength=model.overviewLimits.text;
        input.addEventListener('input',()=>{items[index]=input.value;changed();});row.append(caption,input);
        const actions=node('div','school-admin-actions');
        const move=step=>{[items[index],items[index+step]]=[items[index+step],items[index]];rerender(prefix+'-'+(index+step));};
        const up=button('上へ',()=>move(-1)),down=button('下へ',()=>move(1));up.disabled=index===0;down.disabled=index===items.length-1;
        actions.append(up,down,button('この説明欄を削除',()=>{if(items[index].trim()&&!confirm('この説明欄を削除しますか？ 保存前なら「未保存の変更を取り消す」で戻せます。'))return;items.splice(index,1);rerender(prefix+'-add');}));
        row.append(actions);host.append(row);
      });
      const add=button('説明欄を追加',()=>{if(items.length>=model.overviewLimits.items)return;items.push('');rerender(prefix+'-'+(items.length-1));});
      add.id=prefix+'-add';add.disabled=items.length>=model.overviewLimits.items;
      host.append(add,node('small','school-overview-edit-limit','説明欄：'+items.length+' / '+model.overviewLimits.items+'件。保存後にページへ反映されます。'));
    }
    if(overviewPart!=='people') {
      const items=overviewPart==='general'?draft.overview.teachers.general:draft.overview[overviewPart];
      descriptions(fields,items,'overview-'+overviewPart);return;
    }
    const people=draft.overview.teachers.people;
    people.forEach((person,index)=>{
      const card=node('fieldset','school-overview-edit-person');card.dataset.teacherId=person.id;
      const legend=node('legend','','講師 '+(index+1)+(person.name?'：'+person.name:''));card.append(legend);
      const caption=node('label','','氏名'),name=node('input');name.type='text';name.id='overview-'+person.id+'-name';caption.htmlFor=name.id;
      name.value=person.name;name.maxLength=model.overviewLimits.name;
      name.addEventListener('input',()=>{person.name=name.value;legend.textContent='講師 '+(index+1)+(name.value?'：'+name.value:'');changed();});card.append(caption,name);
      descriptions(card,person.items,'overview-'+person.id);
      const actions=node('div','school-admin-actions');
      const move=step=>{[people[index],people[index+step]]=[people[index+step],people[index]];rerender(name.id);};
      const up=button('講師を上へ',()=>move(-1)),down=button('講師を下へ',()=>move(1));up.disabled=index===0;down.disabled=index===people.length-1;
      actions.append(up,down,button('この講師の欄を削除',()=>{if((person.name.trim()||person.items.some(text=>text.trim()))&&!confirm('この講師の欄を削除しますか？ 保存前なら取り消せます。'))return;people.splice(index,1);rerender('overview-add-person');}));card.append(actions);fields.append(card);
    });
    const add=button('講師の欄を追加',()=>{if(people.length>=model.overviewLimits.people)return;const id='teacher-'+crypto.randomUUID();people.push({id,name:'',items:['']});rerender('overview-'+id+'-name');});
    add.id='overview-add-person';add.disabled=people.length>=model.overviewLimits.people;fields.append(add);
  }
  function render() {
    const container=$('school-editor-fields');container.replaceChildren();
    if($('school-edit-group').value==='概要'){renderOverviewEditor(container);return;}
    if(globalThis.TWIY_SCHOOL_HISTORY_EDITOR(container,$('school-edit-group').value,{draft,changed,busy,message,render}))return;
    for(const field of editableFields.filter(field=>field.group===$('school-edit-group').value)) {
      const row=document.createElement('div');row.className='school-admin-field';
      const label=document.createElement('label');label.htmlFor='school-edit-'+field.key;label.textContent=field.label;
      const multiline=field.max>500||field.key==='heroJapanese'||field.key.startsWith('voice');
      const input=document.createElement(multiline?'textarea':'input');
      input.id=label.htmlFor;input.name=field.key;input.value=draft.text[field.key];input.maxLength=field.max;
      if(input.tagName==='TEXTAREA')input.rows=field.max>3000?7:4;
      else input.type='text';
      row.append(label,input);
      const control=row.querySelector('input,textarea');
      if(field.group==='共通メニュー')control.required=true;
      control.addEventListener('input',()=>{draft.text[field.key]=control.value;changed();});
      if(['navOverview','navVoice','navAccess','navHistory','navResultsStories'].includes(field.key)){
        const help=document.createElement('small');
        help.textContent=field.key==='navVoice'?'従来の合格体験記ページの見出しと、切替リンク名です。':'C1・ホームH2のメニューと、リンク先ページの見出しを同じ名称に揃えます。';row.append(help);
      }
      container.append(row);
      if(field.key==='heroJapanese'){
        const help=document.createElement('small');help.textContent='スマートフォンでは「———」の前を日本語訳、後を出典として分け、出典を右寄せにします。PCの表示は従来どおりです。';row.append(help);
      }
      if(/^voice\dParagraph\d+$/.test(field.key)){
        const help=document.createElement('small');help.textContent='本文は合格実績ページ内の体験記と、従来の合格体験記ページの両方に反映されます。';row.append(help);
      }
      if(field.key==='voice5Title'){
        const help=document.createElement('small');help.textContent='従来の合格体験記ページの見出しです。実績ページ最上部の見出しは「合格実績内の体験記」で編集できます。';row.append(help);
      }
    }
  }
  async function load() {
    const result=await api.read();draft=model.clone(result.data);revision=result.revision;dirty=false;
    $('school-save-state').textContent=result.updatedAt?'保存済み：'+new Date(result.updatedAt).toLocaleString('ja-JP'):'初期内容（まだ保存されていません）';render();
  }
  $('school-login-form').addEventListener('submit',async event=>{
    event.preventDefault();if(working)return;
    if(!api.local){message('この管理画面はPC内のテスト版です。公開サーバーの更新機能は未接続です。',true);return;}
    if($('school-password').value!=='TWIY3813'){message('パスワードを確認してください。',true);return;}
    working=true;const button=event.currentTarget.querySelector('button');button.disabled=true;
    try{await load();authenticated=true;$('school-password').value='';$('school-login').hidden=true;$('school-workspace').hidden=false;message('文章を編集し、「このブラウザーに保存」を押してください。');$('school-edit-group').focus();}
    catch(error){message(error.message,true);}
    finally{working=false;button.disabled=false;}
  });
  $('school-edit-group').addEventListener('change',render);
  $('school-editor-form').addEventListener('submit',async event=>{
    event.preventDefault();if(working||!authenticated)return;busy(true);message('保存しています…');
    try{
      const result=await api.save(model.validate(draft),revision);draft=model.clone(result.data);revision=result.revision;dirty=false;
      render(); // Rebind history inputs to the newly validated draft after saving.
      $('school-save-state').textContent='保存済み：'+new Date(result.updatedAt).toLocaleString('ja-JP');
      message('このブラウザーに保存しました。確認するページを再読み込みしてください。');
    }catch(error){message(error.message,true);}finally{busy(false);}
  });
  $('school-discard').addEventListener('click',async()=>{
    if(working||!authenticated||(dirty&&!confirm('未保存の変更を取り消しますか？')))return;
    busy(true);try{await load();message('最後に保存した内容に戻しました。');}catch(error){message(error.message,true);}finally{busy(false);}
  });
  $('school-logout').addEventListener('click',()=>{
    if(working||(dirty&&!confirm('未保存の変更を破棄してログアウトしますか？')))return;
    authenticated=false;dirty=false;draft=null;$('school-editor-fields').replaceChildren();$('school-workspace').hidden=true;$('school-login').hidden=false;message('ログアウトしました。');$('school-password').focus();
  });
  $('school-export').addEventListener('click',async()=>{
    if(working||!authenticated)return;busy(true);
    try{
      const saved=await api.read();const blob=new Blob([JSON.stringify({format:'twiy-school-text-backup',createdAt:new Date().toISOString(),data:saved.data},null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='twiy-school-'+new Date().toISOString().slice(0,10)+'.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      message('保存済みの文章・沿革写真を書き出しました。未保存の変更は含まれません。');
    }catch(error){message(error.message,true);}finally{busy(false);}
  });
  $('school-import').addEventListener('click',()=>{
    if(working||!authenticated||(dirty&&!confirm('未保存の編集を、読み込む内容に置き換えますか？')))return;$('school-import-file').click();
  });
  $('school-import-file').addEventListener('change',async()=>{
    const file=$('school-import-file').files[0];if(!file||!authenticated)return;busy(true);
    try{
      if(file.size>35000000)throw Error('35MB以下の塾用JSONを選んでください。');
      const backup=JSON.parse(await file.text());if(backup.format!=='twiy-school-text-backup')throw Error('塾用の編集データではありません。');
      draft=model.validate(backup.data);changed();render();message('編集画面に読み込みました。まだ未保存です。確認してから保存してください。');
    }catch(error){message('読み込めませんでした。'+error.message,true);}finally{$('school-import-file').value='';busy(false);}
  });
  addEventListener('beforeunload',event=>{if(dirty||working){event.preventDefault();event.returnValue='';}});
  if(!api.local){$('school-login-form').querySelector('button').disabled=true;message('PC内のファイル、localhost、127.0.0.1から開いてください。本番用の認証・更新機能は未接続です。',true);}
})();
