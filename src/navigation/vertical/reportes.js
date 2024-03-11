export default [
  { 
    heading: 'Reportes', 
    subject: 'peru/repo', 
    action: 'peru/repo',
  },
  { 
    title: 'Asistencia conferencia', 
    to: 'reportes-asistencia-conferencia',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_asis_conf', 
    action: 'peru/repo_come_asis_conf', 
  },
  { 
    title: 'Ciclo pedido', 
    to: 'reportes-ciclo-pedido',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_cicl_pedi', 
    action: 'peru/repo_come_cicl_pedi', 
  },
  { 
    title: 'Comportamiento C&D', 
    to: 'reportes-comportamiento-cambios',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_comp_canj_devo', 
    action: 'peru/repo_come_comp_canj_devo', 
  },
  { 
    title: 'Consecutividad asesoras', 
    to: 'reportes-consecutividad',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_cons_ases_nuev', 
    action: 'peru/repo_come_cons_ases_nuev', 
  },
  { 
    title: 'Directorio lider', 
    to: 'reportes-directorio-lider',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_dire_lide', 
    action: 'peru/repo_come_dire_lide', 
  },
  { 
    title: 'Distribución', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Consolidado estado pedido', 
        to: 'reportes-distribucion-consolidado-estado-pedido',
        subject: 'peru/repo_dist_cons_esta_pedi', 
        action: 'peru/repo_dist_cons_esta_pedi', 
      },
      { 
        title: 'Estado pedido fecha', 
        to: 'reportes-distribucion-estado-pedido-fecha',
        subject: 'peru/repo_dist_esta_pedi_fech', 
        action: 'peru/repo_dist_esta_pedi_fech', 
      },
    ],
  },
  { 
    title: 'Fraccionamiento', 
    to: 'reportes-fraccionamiento',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_sald_cart', 
    action: 'peru/repo_come_sald_cart', 
  },
  { 
    title: 'Gemmas acumuladas', 
    to: 'reportes-gemmas-acumuladas',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_gemm_acum', 
    action: 'peru/repo_come_gemm_acum', 
  },
  { 
    title: 'Indicadores de gestión', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Evaluación cierre', 
        to: 'reportes-evaluacion-cierre',
        subject: 'peru/repo_come_eval_cier', 
        action: 'peru/repo_come_eval_cier', 
      },
      { 
        title: 'Proyección región', 
        to: 'reportes-proyeccion-region',
        subject: 'peru/repo_come_proy_camp_regi', 
        action: 'peru/repo_come_proy_camp_regi', 
      },
      { 
        title: 'Proyección zona', 
        to: 'reportes-proyeccion-zona',
        subject: 'peru/repo_come_proy_camp', 
        action: 'peru/repo_come_proy_camp', 
      },
      { 
        title: 'Seguimiento cierre region', 
        to: 'reportes-seguimiento-cierre-region',
        subject: 'peru/repo_come_segu_cier_camp_regi', 
        action: 'peru/repo_come_segu_cier_camp_regi', 
      },
      { 
        title: 'Seguimiento cierre zona', 
        to: 'reportes-seguimiento-cierre-zona',
        subject: 'peru/repo_come_segu_cier_camp', 
        action: 'peru/repo_come_segu_cier_camp', 
      },
      { 
        title: 'Semaforo lider', 
        to: 'reportes-semaforo-lider',
        subject: 'peru/repo_come_sema-lide', 
        action: 'peru/repo_come_sema-lide', 
      },  
    ],
  },
  { 
    title: 'Inscripciones', 
    to: 'reportes-inscripciones',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_insc_movi', 
    action: 'peru/repo_come_insc_movi', 
  },
  { 
    title: 'Lider pago', 
    to: 'reportes-lider-pago',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_lide_pago', 
    action: 'peru/repo_come_lide_pago', 
  },
  { 
    title: 'Listado asesora', 
    to: 'reportes-listado-asesora',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_list_ases', 
    action: 'peru/repo_come_list_ases', 
  },
  { 
    title: 'Pedido digitado pais', 
    to: 'reportes-pedido-digitado-pais',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_pedi_digi_pais', 
    action: 'peru/repo_come_pedi_digi_pais', 
  },
  { 
    title: 'Pedido digitado región', 
    to: 'reportes-pedido-digitado-region',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_pedi_digi_regi', 
    action: 'peru/repo_come_pedi_digi_regi', 
  },
  { 
    title: 'Pedido digitado zona', 
    to: 'reportes-pedido-digitado-zona',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_pedi_digi', 
    action: 'peru/repo_come_pedi_digi', 
  },
  { 
    title: 'Posible asesora', 
    to: 'reportes-posibles-asesoras',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_posi_ases', 
    action: 'peru/repo_come_posi_ases', 
  },
  { 
    title: 'Prepedido', 
    to: 'reportes-prepedido',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_prep_pedi', 
    action: 'peru/repo_come_prep_pedi', 
  },
  { 
    title: 'Producto lider', 
    to: 'reportes-producto-lider',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_prod_lide', 
    action: 'peru/repo_come_prod_lide', 
  },
  { 
    title: 'Referidos', 
    to: 'reportes-referidos',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_refe', 
    action: 'peru/repo_come_refe', 
  },
  { 
    title: 'Simulador de cobranza', 
    to: 'reportes-simulador-cobranza',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_simu_cobr', 
    action: 'peru/repo_come_simu_cobr', 
  },
  { 
    title: 'Status MGZ', 
    to: 'reportes-status-mgz',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_stat_mgzz', 
    action: 'peru/repo_come_stat_mgzz', 
  },

  /*{ 
    title: 'Solicitar vacaciones', 
    to: 'reportes-vacaciones-consolidado',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_soli_vaca', 
    action: 'peru/repo_come_soli_vaca', 
  },*/

  { 
    title: 'Vacaciones', 
    icon: { icon: 'tabler-search' },
    children: [
      { 
        title: 'Consolidado', 
        to: 'reportes-vacaciones-consolidado',
        subject: 'peru/repo_come_soli_vaca', 
        action: 'peru/repo_come_soli_vaca', 
      },

      /*{ 
        title: 'Pendientes región', 
        to: 'reportes-vacaciones-pendientes-region',
        subject: 'peru/repo_come_vaca_pend', 
        action: 'peru/repo_come_vaca_pend', 
      },*/
    ],
  },
  { 
    title: 'Tracking zona', 
    to: 'reportes-tracking-zona',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_trac_zona', 
    action: 'peru/repo_come_trac_zona', 
  },
  { 
    title: 'Visitas', 
    to: 'reportes-visitas',
    icon: { icon: 'tabler-report' },
    subject: 'peru/repo_come_visi', 
    action: 'peru/repo_come_visi', 
  },





  
]
