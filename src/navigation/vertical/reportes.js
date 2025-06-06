export default [
  { 
    heading: 'Reportes', 
    subject: 'colombia/repo', 
    action: 'colombia/repo',
  },
  { 
    title: 'Asistencia conferencia',  
    to: 'reportes-asistencia-conferencia',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_asis_conf', 
    action: 'colombia/repo_come_asis_conf', 
  },
  { 
    title: 'Ciclo pedido', 
    to: 'reportes-ciclo-pedido',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_cicl_pedi', 
    action: 'colombia/repo_come_cicl_pedi', 
  },
  // { 
  //   title: 'Comportamiento C&D', 
  //   to: 'reportes-comportamiento-cambios',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_comp_canj_devo', 
  //   action: 'colombia/repo_come_comp_canj_devo', 
  // },
  { 
    title: 'Consecutividad asesoras nuevas', 
    to: 'reportes-consecutividad',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_cons_ases_nuev', 
    action: 'colombia/repo_come_cons_ases_nuev', 
  },
  // { 
  //   title: 'Directorio lider', 
  //   to: 'reportes-directorio-lider',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_dire_lide', 
  //   action: 'colombia/repo_come_dire_lide', 
  // },
  { 
    title: 'Directorio Lider', 
    to: 'reportes-repo-lide-refe',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_lide_refe', 
    action: 'colombia/repo_lide_refe', 
  },
  { 
    title: 'Consulta Asignacion Sectores', 
    to: 'reportes-repo-cons-asig-sect',
    icon: { icon: 'tabler-world-up' },
    subject: 'colombia/repo_cons_asig_sect', 
    action: 'colombia/repo_cons_asig_sect',
  },
  { 
    title: 'Distribución', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Consolidado estado pedido', 
        to: 'reportes-distribucion-consolidado-estado-pedido',
        subject: 'colombia/repo_dist_cons_esta_pedi', 
        action: 'colombia/repo_dist_cons_esta_pedi', 
      },
      { 
        title: 'Estado pedido fecha', 
        to: 'reportes-distribucion-estado-pedido-fecha',
        subject: 'colombia/repo_dist_esta_pedi_fech', 
        action: 'colombia/repo_dist_esta_pedi_fech', 
      },
    ],
  },
  // { 
  //   title: 'Fraccionamiento', 
  //   to: 'reportes-fraccionamiento',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_sald_cart', 
  //   action: 'colombia/repo_come_sald_cart', 
  // },
  { 
    title: 'Gemmas acumuladas', 
    to: 'reportes-gemmas-acumuladas',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_gemm_acum', 
    action: 'colombia/repo_come_gemm_acum', 
  },
  { 
    title: 'Indicadores de gestión', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Evaluación cierre zona', 
        to: 'reportes-evaluacion-cierre',
        subject: 'colombia/repo_come_eval_cier', 
        action: 'colombia/repo_come_eval_cier', 
      },
      { 
        title: 'Proyección región', 
        to: 'reportes-proyeccion-region',
        subject: 'colombia/repo_come_proy_camp_regi', 
        action: 'colombia/repo_come_proy_camp_regi', 
      },
      { 
        title: 'Proyección zona', 
        to: 'reportes-proyeccion-zona',
        subject: 'colombia/repo_come_proy_camp', 
        action: 'colombia/repo_come_proy_camp', 
      },
      { 
        title: 'Seguimiento cierre país', 
        to: 'reportes-seguimiento-cierre-pais',
        subject: 'colombia/repo_come_segu_cier_camp_pais', 
        action: 'colombia/repo_come_segu_cier_camp_pais', 
      },
      { 
        title: 'Seguimiento cierre region', 
        to: 'reportes-seguimiento-cierre-region',
        subject: 'colombia/repo_come_segu_cier_camp_regi', 
        action: 'colombia/repo_come_segu_cier_camp_regi', 
      },
      { 
        title: 'Seguimiento cierre zona', 
        to: 'reportes-seguimiento-cierre-zona',
        subject: 'colombia/repo_come_segu_cier_camp', 
        action: 'colombia/repo_come_segu_cier_camp', 
      },
      { 
        title: 'Semaforo lider', 
        to: 'reportes-semaforo-lider',
        subject: 'colombia/repo_come_sema_lide', 
        action: 'colombia/repo_come_sema_lide', 
      },
      { 
        title: 'Semaforo zona', 
        to: 'reportes-semaforo-zona',
        subject: 'colombia/repo_come_sema_zona', 
        action: 'colombia/repo_come_sema_zona', 
      },
      { 
        title: 'Lideres Ganadoras Zona', 
        to: 'reportes-lider-ganadoras-zona',
        subject: 'colombia/repo_come_lide_gana_zona', 
        action: 'colombia/repo_come_lide_gana_zona', 
      },
      { 
        title: 'Lideres Ganadoras Region', 
        to: 'reportes-lider-ganadoras-region',
        subject: 'colombia/repo_come_lide_gana_regi', 
        action: 'colombia/repo_come_lide_gana_regi', 
      }  
    ],
  },
  // { 
  //   title: 'Comercial', 
  //   icon: { icon: 'tabler-search' },
  //   children: [
    
  //   ],
  // },
  // { 
  //   title: 'Incorporacion Digital', 
  //   to: 'reportes-inscripciones',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_insc_movi', 
  //   action: 'colombia/repo_come_insc_movi', 
  // },
  // { 
  //   title: 'Lider pago', 
  //   to: 'reportes-lider-pago',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_lide_pago', 
  //   action: 'colombia/repo_come_lide_pago', 
  // },
  { 
    title: 'Listado asesora', 
    to: 'reportes-listado-asesora',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_list_ases', 
    action: 'colombia/repo_come_list_ases', 
  },
  { 
    title: 'Pedido digitado pais', 
    to: 'reportes-pedido-digitado-pais',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_pedi_digi_pais', 
    action: 'colombia/repo_come_pedi_digi_pais', 
  },
  { 
    title: 'Pedido digitado región', 
    to: 'reportes-pedido-digitado-region',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_pedi_digi_regi', 
    action: 'colombia/repo_come_pedi_digi_regi', 
  },
  { 
    title: 'Pedido digitado zona', 
    to: 'reportes-pedido-digitado-zona',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_pedi_digi', 
    action: 'colombia/repo_come_pedi_digi', 
  },
  // { 
  //   title: 'Posible asesora', 
  //   to: 'reportes-posibles-asesoras',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_posi_ases', 
  //   action: 'colombia/repo_come_posi_ases', 
  // },
  { 
    title: 'Azzorti Proyecta', 
    to: 'reportes-prepedido',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_prep_pedi', 
    action: 'colombia/repo_come_prep_pedi', 
  },
  { 
    title: 'Producto lider', 
    to: 'reportes-producto-lider',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_prod_lide', 
    action: 'colombia/repo_come_prod_lide', 
  },
  { 
    title: 'Referidos', 
    to: 'reportes-referidos',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_refe', 
    action: 'colombia/repo_come_refe', 
  },
  // { 
  //   title: 'Segmentación asesora', 
  //   to: 'reportes-segmentacion-asesora',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_segm_ases', 
  //   action: 'colombia/repo_come_segm_ases', 
  // },
  { 
    title: 'Simulador de cobranza', 
    to: 'reportes-simulador-cobranza',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_simu_cobr', 
    action: 'colombia/repo_come_simu_cobr', 
  },
  // { 
  //   title: 'Status MGZ', 
  //   to: 'reportes-status-mgz',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_come_stat_mgzz', 
  //   action: 'colombia/repo_come_stat_mgzz', 
  // },
  { 
    title: 'Tracking zona', 
    to: 'reportes-tracking-zona',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_trac_zona', 
    action: 'colombia/repo_come_trac_zona', 
  },
  { 
    title: 'Vacaciones', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Consolidado', 
        to: 'reportes-vacaciones-consolidado',
        subject: 'colombia/repo_come_soli_vaca', 
        action: 'colombia/repo_come_soli_vaca', 
      },
      { 
        title: 'Pendientes región', 
        to: 'reportes-vacaciones-pendientes',
        subject: 'colombia/repo_come_vaca_pend', 
        action: 'colombia/repo_come_vaca_pend', 
      },
    ],
  },
  { 
    title: 'Vinculación digital', 
    to: 'reportes-vinculacion-digital',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_vinc_digi', 
    action: 'colombia/repo_come_vinc_digi', 
  },
  { 
    title: 'Azzorti Maps', 
    to: 'reportes-visitas',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_come_visi', 
    action: 'colombia/repo_come_visi', 
  },
  { 
    title: 'Concurso Sueños', 
    to: 'reportes-concurso-suenos',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_conc_dupr', 
    action: 'colombia/repo_conc_dupr', 
  },
  { 
    title: 'Impresion Saldos Cartera', 
    to: 'reportes-impr-sald-cart',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/impr_sald_cart', 
    action: 'colombia/impr_sald_cart', 
  },
  { 
    title: 'Faltante Anunciado', 
    to: 'reportes-falt-anun',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_falt_anun', 
    action: 'colombia/repo_falt_anun', 
  },

  { 
    title: 'App Movil', 
    to: 'reportes-reporte-app-movil',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_app_movi', 
    action: 'colombia/repo_app_movi', 
  },
  // { 
  //   title: 'Reporte Duproyecta', 
  //   to: 'reportes-reporte-duproyecta',
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_pre_pedi', 
  //   action: 'colombia/repo_pre_pedi', 
  // },
  {
    title: 'Reporte PBIE', 
    to: 'reportes-reporte-pbie',
    icon: { icon: 'tabler-report' },
    subject: 'colombia/menu_repo_pbie', 
    action: 'colombia/menu_repo_pbie', 
  },
  // { 
  //   title: 'Indicador Gestion', 
  //   to: 'reportes-indicadores-gestion', 
  //   icon: { icon: 'tabler-report' },
  //   subject: 'colombia/repo_tab_cons', 
  //   action: 'colombia/repo_tab_cons', 
  // },
  { 
    title: 'Vinculacion', 
    to: 'reportes-reporte-vinculacion', 
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_vinc_digi', 
    action: 'colombia/repo_vinc_digi', 
  },
  { 
    title: 'Repo Pedidos Digitados', 
    to: 'reportes-repo-pedi-digi', 
    icon: { icon: 'tabler-report' },
    subject: 'colombia/repo_pedi_digi', 
    action: 'colombia/repo_pedi_digi', 
  },
  
]
 