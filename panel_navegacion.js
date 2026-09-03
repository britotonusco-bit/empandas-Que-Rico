(function(){
  function iniciarNavegacion(){
    const app=document.getElementById('appView');
    const access=document.getElementById('accessMessage');
    const productsSection=document.getElementById('productsSection');
    const historySection=document.querySelector('.history-section');
    if(!app || !access || document.getElementById('panelNavigation')) return;

    const nav=document.createElement('nav');
    nav.id='panelNavigation';
    nav.className='panel-navigation';
    nav.setAttribute('aria-label','Secciones del panel');
    access.insertAdjacentElement('afterend',nav);

    const ordersList=document.getElementById('ordersList');
    const orderToolbar=document.getElementById('searchInput')?.closest('.toolbar');
    const orderTitle=ordersList?.previousElementSibling;

    const groups={
      dashboard:[
        document.querySelector('.dashboard-title'),
        document.querySelector('.dashboard-stats'),
        document.querySelector('.dashboard-charts'),
        document.querySelector('.product-branch-ranking'),
        document.querySelector('.dashboard-branches')
      ].filter(Boolean),
      orders:[orderToolbar,orderTitle,ordersList].filter(Boolean),
      products:[document.getElementById('productCategoryNav'),productsSection].filter(Boolean),
      history:[historySection].filter(Boolean)
    };

    const tabs=[
      ['dashboard','📊 Resumen'],
      ['orders','📦 Pedidos'],
      ['products','🍽️ Productos y configuración'],
      ['history','📋 Historial']
    ];

    function esAdministrador(){
      // panel.js mantiene el rol en una variable let que no es window.rolActual.
      // productsSection sí refleja el rol: solo el administrador puede verla.
      return !!productsSection && !productsSection.classList.contains('hidden');
    }

    function visibleGroup(key){
      if((key==='products'||key==='history') && !esAdministrador()) key='dashboard';
      Object.keys(groups).forEach(name=>{
        groups[name].forEach(el=>el.classList.toggle('panel-view-hidden',name!==key));
      });
      nav.querySelectorAll('button').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===key));
      try{sessionStorage.setItem('eqr_panel_view',key)}catch(e){}
    }

    tabs.forEach(([key,label])=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='panel-nav-tab';
      btn.dataset.view=key;
      btn.textContent=label;
      btn.addEventListener('click',()=>visibleGroup(key));
      nav.appendChild(btn);
    });


    const closeWeekBtn=document.getElementById('closeWeekBtn');

    async function cerrarSemana(){
      if(!productsSection || !productsSection.classList.contains('hidden')) return;
      const ok=confirm(
        "⚠️ CERRAR SEMANA\n\n"+
        "Se eliminarán TODOS los pedidos de la semana actual, sin importar su estado.\n\n"+
        "Los productos y su configuración NO se eliminarán.\n"+
        "El historial de auditoría se conservará.\n\n"+
        "¿Deseas continuar?"
      );
      if(!ok) return;

      if(closeWeekBtn) closeWeekBtn.disabled=true;
      try{
        const cfg=window.SUPABASE_CONFIG||{};
        if(!window.supabase || !cfg.url || !cfg.anonKey){
          throw new Error("Supabase no está disponible.");
        }
        const c=window.supabase.createClient(cfg.url,cfg.anonKey);
        const {data,error}=await c.rpc("cerrar_semana_tecnico");
        if(error) throw error;
        alert(`Semana cerrada correctamente. Pedidos eliminados: ${Number(data||0)}.`);
        if(typeof window.location!=="undefined") window.location.reload();
      }catch(err){
        alert("No se pudo cerrar la semana:\n\n"+(err.message||err));
      }finally{
        if(closeWeekBtn) closeWeekBtn.disabled=false;
      }
    }

    if(closeWeekBtn){
      closeWeekBtn.addEventListener('click',cerrarSemana);
    }

    function actualizarPermisos(){
      const admin=esAdministrador();
      if(closeWeekBtn) closeWeekBtn.style.display=admin?'none':'inline-flex';
      const productTab=nav.querySelector('[data-view="products"]');
      const historyTab=nav.querySelector('[data-view="history"]');
      if(productTab) productTab.style.display=admin?'inline-flex':'none';
      if(historyTab) historyTab.style.display=admin?'inline-flex':'none';

      const active=nav.querySelector('.panel-nav-tab.active')?.dataset.view;
      if(!admin && (active==='products'||active==='history')) visibleGroup('dashboard');
    }

    function restaurarVista(){
      let guardada='dashboard';
      try{guardada=sessionStorage.getItem('eqr_panel_view')||'dashboard'}catch(e){}
      if((guardada==='products'||guardada==='history') && !esAdministrador()) guardada='dashboard';
      visibleGroup(guardada);
    }

    // El rol se aplica en panel.js quitando/agregando .hidden a productsSection.
    // Observamos ese cambio para que las pestañas aparezcan correctamente al iniciar sesión.
    if(productsSection){
      new MutationObserver(()=>{
        actualizarPermisos();
        if(!app.classList.contains('hidden')) restaurarVista();
      }).observe(productsSection,{attributes:true,attributeFilter:['class']});
    }

    // También observamos la entrada/salida del panel.
    new MutationObserver(()=>{
      actualizarPermisos();
      if(!app.classList.contains('hidden')) restaurarVista();
    }).observe(app,{attributes:true,attributeFilter:['class']});

    actualizarPermisos();
    visibleGroup('dashboard');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciarNavegacion);
  else iniciarNavegacion();
})();
