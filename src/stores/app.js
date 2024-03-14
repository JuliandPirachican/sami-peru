export const useAppStore = defineStore('app', {
  state: () => ({
    loadingState: false,
    snackbarState: false,
    mensajeState: '',
    mensajeSnackbarState: '',
    colorState: '',
    tituloState: '',
    localization: {
      percentsymbol: '%',
      currencysymbol: 'S/. ',
      currencysymbolposition: 'before',
      decimalseparator: '.',
      thousandsseparator: '',
      pagergotopagestring: 'Ir a pag =',
      pagershowrowsstring: 'Mostrar filar =',
      pagerrangestring: ' de ',
      pagerpreviousbuttonstring: 'Previo',
      pagernextbuttonstring: 'Siguiente',
      groupsheaderstring: 'Arrastre una columna para agrupar',
      sortascendingstring: 'Ordernar asc',
      sortdescendingstring: 'Ordenar des',
      sortremovestring: 'Quitar orden',
      groupbystring: 'Agrupar por esta columna',
      groupremovestring: 'Quitar de grupos',
      filterclearstring: 'Limpiar',
      filterstring: 'Filtro',
      filtershowrowstring: 'Mostrar fila donde =',
      filtershowrowdatestring: 'Mostrar file donde fecha =',
      filterorconditionstring: 'o',
      filterandconditionstring: 'y',
      filterselectallstring: '(Seleccionar todo)',
      filterchoosestring: 'Por favor seleccione:',
      filterstringcomparisonoperators: [
        'Vacio',
        'No vacio',
        'Contenga',
        'Contenga(coincidir mayusculas/minisculas)',
        'No contenga',
        'No contenga (coincidir mayusculas/minisculas)',
        'Inicia con',
        'Inicia con(coincidir mayusculas/minisculas)',
        'Termina con',
        'Termina con (coincidir mayusculas/minisculas)',
        'Igual',
        'Igual(coincidir mayusculas/minisculas)',
        'Nulo',
        'No nulo',
      ],
      filternumericcomparisonoperators: ['=', '!=', '<', '<=', '>', '>=', 'Nulo', 'No nulo'],
      filterdatecomparisonoperators: ['=', '!=', '<', '<=', '>', '>=', 'Nulo', 'No nulo'],
      filterbooleancomparisonoperators: ['=', '!='],
      validationstring: 'Valor no valido',
      emptydatastring: 'No hay registros que mostrar',
      filterselectstring: ' ',
      loadtext: 'Cargando…',
      clearstring: 'Limpiar',
      todaystring: 'Hoy',
      browsebutton: 'Buscar',
      uploadbutton: 'Cargar',
      cancelbutton: 'Cancelar',
      uploadfiletooltip: 'Cargar',
      cancelfiletooltip: 'Cancelar',
    },
  }),
  actions: {
    snackbar(valor) {
      this.snackbarState = valor
    },
    color(valor) {
      this.colorState = valor
    },
    loading(valor) {
      this.loadingState = valor
    },
    mensaje(valor) {
      this.mensajeState = valor
    },
    mensajeSnackbar(valor) {
      this.mensajeSnackbarState = valor
    },
    titulo(valor) {
      this.tituloState = valor
    },
  },
})
