export default [
  { 
    heading: 'Consultas', 
    subject: 'colombia/cons', 
    action: 'colombia/cons',
  },
  { 
    title: 'Consulta Saldo Cartera', 
    to: { name: 'consultas-saldo-cartera' }, 
    icon: 'tabler-search',
    subject: 'colombia/cons_sald_cart_gene', 
    action: 'colombia/cons',
  },
  { 
    title: 'Log pedido', 
    to: { name: 'consultas-log-pedido' }, 
    icon: 'tabler-shopping-cart-cog',
    subject: 'colombia/cons_come_logg_pedi', 
    action: 'colombia/cons',
  },
  { 
    title: 'Consultas Generales', 
    to: { name: 'consultas-cons-clie' }, 
    icon: 'tabler-shopping-cart-cog',
    subject: 'colombia/cons_clie', 
    action: 'colombia/cons',
  },
  { 
    title: 'Consolidado Campaña', 
    to: { name: 'procesos-consolidado-campana' }, 
    icon: 'tabler-world-up',
    subject: 'colombia/proc_tab_cons', 
    action: 'colombia/cons',
  },
]
