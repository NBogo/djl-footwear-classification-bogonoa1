// Drag & Drop
const dz=document.getElementById('dropZone');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover')});
dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('dragover');const f=e.dataTransfer.files;document.getElementById('image').files=f;checkFiles(f)});

// Health check
fetch('/health').then(r=>r.json()).then(d=>{const b=document.getElementById('healthBadge');b.classList.add('online');b.innerHTML='&#9679; online';document.getElementById('infoText').textContent='Model: '+d.model+' | Java '+d.javaVersion}).catch(()=>{const b=document.getElementById('healthBadge');b.classList.add('offline');b.innerHTML='&#9679; offline'});

const emojis={Boots:'\u{1F97E}',Shoes:'\u{1F45E}',Sandals:'\u{1FA74}',Slippers:'\u{1F9E6}'};

function checkFiles(files){
    if(files.length!==1){alert('Please upload exactly one file.');return}
    if(files[0].size/1024/1024>10){alert('File too large (max 10 MB)');return}
    document.getElementById('answerPart').classList.remove('hidden');
    document.getElementById('preview').src=URL.createObjectURL(files[0]);
    document.getElementById('loadingPart').style.display='block';
    document.getElementById('resultsPart').style.display='none';
    const fd=new FormData();fd.append('image',files[0]);
    fetch('/analyze',{method:'POST',body:fd}).then(r=>r.json()).then(data=>{
        document.getElementById('loadingPart').style.display='none';
        document.getElementById('resultsPart').style.display='block';
        displayResults(Array.isArray(data)?data:[data]);
    }).catch(err=>{document.getElementById('loadingPart').style.display='none';alert('Error: '+err)});
}

function displayResults(items){
    items.sort((a,b)=>b.probability-a.probability);
    const top=items[0];const pct=(top.probability*100).toFixed(1);
    document.getElementById('topEmoji').textContent=emojis[top.className]||'\u{1F45F}';
    document.getElementById('topLabel').textContent=top.className;
    document.getElementById('topPercentage').textContent=pct+'%';
    document.getElementById('topResult').style.display='flex';
    let html='';
    items.forEach(it=>{const p=(it.probability*100).toFixed(1);
        html+=`<div class="bar-row"><div class="bar-label">${it.className}</div><div class="bar-track"><div class="bar-fill" style="width:${p}%"></div></div><div class="bar-val">${p}%</div></div>`;
    });
    document.getElementById('classificationList').innerHTML=html;
}

function resetUI(){
    document.getElementById('answerPart').classList.add('hidden');
    document.getElementById('image').value='';
    document.getElementById('topResult').style.display='none';
    document.getElementById('classificationList').innerHTML='';
}
