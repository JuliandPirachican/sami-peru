export const useAppStore = defineStore('app', {
  state: () => ({
    loadingState: false,
    snackbarState: false,
    mensajeState: '',
    mensajeSnackbarState: '',
    colorState: '',
    tituloState: '',
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
