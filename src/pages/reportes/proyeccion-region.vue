<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"

definePage({
  meta: {
    action: 'peru/repo_come_proy_camp_regi',
    subject: 'peru/repo_come_proy_camp_regi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  area: null,
})

const general = ref({
  objetivoIncorporacion: '0',
  proyeccionIncorporacion: '0',
  proyeccionPorcentajeIncorporacion: '0.00',
  reproyeccionIncorporacion: '0',
  reproyeccionPorcentajeIncorporacion: '0.00',
  objetivoRetencion: '0',
  proyeccionRetencion: '0',
  proyeccionPorcentajeRetencion: '0.00',
  reproyeccionRetencion: '0',
  reproyeccionPorcentajeRetencion: '0',
  objetivoActividad: '0.00',
  proyeccionActividad: '0.00',
  proyeccionPorcentajeActividad: '0.00',
  reproyeccionActividad: '0.00',
  reproyeccionPorcentajeActividad: '0.00',
})

const variables = ref([
  { title: 'Todos', value: 0 },
  { title: 'Pedidos totales', value: 1 },
  { title: 'Pedidos de actividad', value: 2 },
  { title: 'Pedidos de retención', value: 3 },
  { title: 'Capitalización', value: 4 },
  { title: 'Cobranza', value: 5 },
  { title: 'Consecutividad', value: 6 },
])

const selectedVariable = ref(0)

const itemsCorte = ref([])
const itemsZona = ref([])

const cabecera = computed(() => {
  if(selectedVariable.value === 0) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_tota_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_tota_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_tota_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_tota_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_tota_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
      {
        title: 'Camp. ante.',
        key: 'acti_camp_ante',
      },
      {
        title: 'Obj. % acti. camp.',
        key: 'acti_obje',
      },
      {
        title: 'Obj. pedi. act.',
        key: 'acti_obje_pedi',
      },
      {
        title: 'Proyección (%)',
        key: 'acti_porc_prim',
      },
      {
        title: 'Obj. proyección',
        key: 'acti_prim',
      },
      {
        title: 'Reproyección (%)',
        key: 'acti_porc_segu',
      },
      {
        title: 'Reproyección',
        key: 'acti_segu',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: '2 camp. ante.',
        key: 'cons_terc_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_terc_obje',
      },
      {
        title: '3 camp. ante.',
        key: 'cons_cuar_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_cuar_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
      {
        title: 'Pos. rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
      {
        title: 'Obj. proyección',
        key: 'capi_obje',
      },
      {
        title: 'Reproyección',
        key: 'capi_repr',
      },
      {
        title: 'Venta',
        key: 'tota_vent',
      },
      {
        title: 'Cobranza 88%(por cobrar)',
        key: 'cobr',
      },
      {
        title: 'Cobranza 88%(te puedes quedar)',
        key: 'cobr_colc',
      },
      {
        title: 'Cobranza 92%(por cobrar)',
        key: 'co92',
      },
      {
        title: 'Cobranza 92%(te puedes quedar)',
        key: 'co92_colc',
      },
    ]
  } else if (selectedVariable.value === 1) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_tota_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_tota_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_tota_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_tota_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_tota_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
    ]
  } else if(selectedVariable.value === 2) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Camp. ante.',
        key: 'acti_camp_ante',
      },
      {
        title: 'Obj. % acti. camp.',
        key: 'acti_obje',
      },
      {
        title: 'Obj. pedi. act.',
        key: 'acti_obje_pedi',
      },
      {
        title: 'Proyección (%)',
        key: 'acti_porc_prim',
      },
      {
        title: 'Obj. proyección',
        key: 'acti_prim',
      },
      {
        title: 'Reproyección (%)',
        key: 'acti_porc_segu',
      },
      {
        title: 'Reproyección',
        key: 'acti_segu',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
    ]
  } else if(selectedVariable.value === 3) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
      {
        title: 'Pos. rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
    ]
  } else if(selectedVariable.value === 4) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pos. rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
      {
        title: 'Obj. proyección',
        key: 'capi_obje',
      },
      {
        title: 'Reproyección',
        key: 'capi_repr',
      },
    ]
  } else if(selectedVariable.value === 5) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Venta',
        key: 'tota_vent',
      },
      {
        title: 'Cobranza 88%(por cobrar)',
        key: 'cobr',
      },
      {
        title: 'Cobranza 88%(te puedes quedar)',
        key: 'cobr_colc',
      },
      {
        title: 'Cobranza 92%(por cobrar)',
        key: 'co92',
      },
      {
        title: 'Cobranza 92%(te puedes quedar)',
        key: 'co92_colc',
      },
    ]
  } else if(selectedVariable.value === 6) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Región',
        key: 'codi_area',
      },
      {
        title: 'Nro zonas',
        key: 'tota_zona',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: '2 camp. ante.',
        key: 'cons_terc_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_terc_obje',
      },
      {
        title: '3 camp. ante.',
        key: 'cons_cuar_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_cuar_obje',
      },
    ]
  }
})

const cabeceraZona = computed(() => {
  if(selectedVariable.value === 0) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_tota_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_tota_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_tota_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_tota_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_tota_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
      {
        title: 'Camp. ante.',
        key: 'acti_camp_ante',
      },
      {
        title: 'Obj.% acti. camp.',
        key: 'acti_obje',
      },
      {
        title: 'Obj. pedi. act.',
        key: 'acti_obje_pedi',
      },
      {
        title: 'Proyección (%)',
        key: 'acti_porc_prim',
      },
      {
        title: 'Obj. proyección',
        key: 'acti_prim',
      },
      {
        title: 'Reproyección (%)',
        key: 'acti_porc_segu',
      },
      {
        title: 'Reproyección',
        key: 'acti_segu',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 Camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: '2 Camp. ante.',
        key: 'cons_terc_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_terc_obje',
      },
      {
        title: '3 Camp. ante.',
        key: 'cons_cuar_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_cuar_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
      {
        title: 'Pos. Rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
      {
        title: 'Obj. proyección',
        key: 'capi_obje',
      },
      {
        title: 'Reproyección',
        key: 'capi_repr',
      },
      {
        title: 'Venta',
        key: 'tota_vent',
      },
      {
        title: 'Cobranza 88%(por cobrar)',
        key: 'cobr',
      },
      {
        title: 'Cobranza 88%(te puedes quedar)',
        key: 'cobr_colc',
      },
      {
        title: 'Cobranza 92%(por cobrar)',
        key: 'co92',
      },
      {
        title: 'Cobranza 92%(te puedes quedar)',
        key: 'co92_colc',
      },
    ]
  } else if(selectedVariable.value === 1) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_tota_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_tota_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_tota_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_tota_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_tota_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
    ]
  } else if(selectedVariable.value === 2) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Camp. ante.',
        key: 'acti_camp_ante',
      },
      {
        title: 'Obj.% acti. camp.',
        key: 'acti_obje',
      },
      {
        title: 'Obj. pedi. act.',
        key: 'acti_obje_pedi',
      },
      {
        title: 'Proyección (%)',
        key: 'acti_porc_prim',
      },
      {
        title: 'Obj. proyección',
        key: 'acti_prim',
      },
      {
        title: 'Reproyección (%)',
        key: 'acti_porc_segu',
      },
      {
        title: 'Reproyección',
        key: 'acti_segu',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 Camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
    ]
  } else if(selectedVariable.value === 3) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_rete_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_rete_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_rete_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_rete_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_rete_segu_porc',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 Camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: 'Peg21',
        key: 'pe21',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe21_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe21_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe21_segu',
      },
      {
        title: 'Peg42',
        key: 'pe42',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe42_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe42_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe42_segu',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pegs',
        key: 'pegs',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pegs_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pegs_prim',
      },
      {
        title: 'Reproyección',
        key: 'pegs_segu',
      },
      {
        title: 'Pos. Rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
    ]
  } else if(selectedVariable.value === 4) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Obj. camp.',
        key: 'pedi_inco_cant',
      },
      {
        title: 'Obj. proyección',
        key: 'pedi_inco_prim',
      },
      {
        title: 'Proyección (%)',
        key: 'pedi_inco_prim_porc',
      },
      {
        title: 'Reproyección',
        key: 'pedi_inco_segu',
      },
      {
        title: 'Reproyección (%)',
        key: 'pedi_inco_segu_porc',
      },
      {
        title: 'Peg63',
        key: 'pe63',
      },
      {
        title: 'Obj. form. éxito',
        key: 'pe63_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'pe63_prim',
      },
      {
        title: 'Reproyección',
        key: 'pe63_segu',
      },
      {
        title: 'Pos. Rein.',
        key: 'rein',
      },
      {
        title: 'Obj. form. éxito',
        key: 'rein_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'rein_prim',
      },
      {
        title: 'Reproyección',
        key: 'rein_segu',
      },
      {
        title: 'Obj. proyección',
        key: 'capi_obje',
      },
      {
        title: 'Reproyección',
        key: 'capi_repr',
      },
    ]
  } else if(selectedVariable.value === 5) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Venta',
        key: 'tota_vent',
      },
      {
        title: 'Cobranza 88%(por cobrar)',
        key: 'cobr',
      },
      {
        title: 'Cobranza 88%(te puedes quedar)',
        key: 'cobr_colc',
      },
      {
        title: 'Cobranza 92%(por cobrar)',
        key: 'co92',
      },
      {
        title: 'Cobranza 92%(te puedes quedar)',
        key: 'co92_colc',
      },
    ]
  } else if(selectedVariable.value === 6) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_inic',
      },
      {
        title: 'Rete. camp. ante.',
        key: 'cons_rete_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_rete_obje',
      },
      {
        title: 'Obj. proyección',
        key: 'cons_rete_prim',
      },
      {
        title: 'Reproyección',
        key: 'cons_rete_segu',
      },
      {
        title: '1 Camp. ante.',
        key: 'cons_segu_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_segu_obje',
      },
      {
        title: '2 Camp. ante.',
        key: 'cons_terc_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_terc_obje',
      },
      {
        title: '3 Camp. ante.',
        key: 'cons_cuar_camp_ante',
      },
      {
        title: 'Obj. form. éxito',
        key: 'cons_cuar_obje',
      },
    ]
  }
})

const clasePedidoTotalZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_tota_prim') {
    
    dataProy = parseInt(dataRecord.pedi_tota_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_tota_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
  
const claseIncorporacionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_inco_prim') {
    
    dataProy = parseInt(dataRecord.pedi_inco_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_inco_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseRetencionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_rete_obje)
  let dataProy = 0
  if (columnfield === 'pedi_rete_prim') {
    
    dataProy = parseInt(dataRecord.pedi_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_rete_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseActividadZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.acti_obje_pedi)
  let dataProy = 0
  if (columnfield === 'acti_prim') {
    
    dataProy = parseInt(dataRecord.acti_prim)
  } else {
    
    dataProy = parseInt(dataRecord.acti_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  
  return `text-error`
}

const claseConsecutividadRetencionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.cons_rete_obje)
  let dataProy = 0
  if (columnfield === 'cons_rete_prim') {
    
    dataProy = parseInt(dataRecord.cons_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.cons_rete_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg21Zona  = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe21_obje)
  let dataProy = 0
  if (columnfield === 'pe21_prim') {
    
    dataProy = parseInt(dataRecord.pe21_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe21_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg42Zona  = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe42_obje)
  let dataProy = 0
  if (columnfield === 'pe42_prim') {
    
    dataProy = parseInt(dataRecord.pe42_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe42_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg63Zona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe63_obje)
  let dataProy = 0
  if (columnfield === 'pe63_prim') {
    
    dataProy = parseInt(dataRecord.pe63_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe63_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePegsZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pegs_obje)
  let dataProy = 0
  if (columnfield === 'pegs_prim') {
    
    dataProy = parseInt(dataRecord.pegs_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pegs_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseReingresoZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.rein_obje)
  let dataProy = 0
  if (columnfield === 'rein_prim') {
    
    dataProy = parseInt(dataRecord.rein_prim)
  } else {
    
    dataProy = parseInt(dataRecord.rein_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseCapitalizacionZona = (row, columnfield, value) => {
  if (value <= 0) {
    return `text-error`
  }
  
  return ``
}

const clasePedidoTotalConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_tota_prim') {
    dataProy = parseInt(dataRecord.pedi_tota_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_tota_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseIncorporacionConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_inco_prim') {
    
    dataProy = parseInt(dataRecord.pedi_inco_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_inco_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseRetencionConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_rete_obje)
  let dataProy = 0
  if (columnfield === 'pedi_rete_prim') {
    
    dataProy = parseInt(dataRecord.pedi_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_rete_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseActividadConsolidado   = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.acti_obje_pedi)
  let dataProy = 0
  if (columnfield === 'acti_prim') {
    
    dataProy = parseInt(dataRecord.acti_prim)
  } else {
    
    dataProy = parseInt(dataRecord.acti_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  
  return `text-error`
}

const claseConsecutividadRetencionConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.cons_rete_obje)
  let dataProy = 0
  if (columnfield === 'cons_rete_prim') {
    
    dataProy = parseInt(dataRecord.cons_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.cons_rete_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg21Consolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe21_obje)
  let dataProy = 0
  if (columnfield === 'pe21_prim') {
    
    dataProy = parseInt(dataRecord.pe21_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe21_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg42Consolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe42_obje)
  let dataProy = 0
  if (columnfield === 'pe42_prim') {
    
    dataProy = parseInt(dataRecord.pe42_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe42_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg63Consolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe63_obje)
  let dataProy = 0
  if (columnfield === 'pe63_prim') {
    
    dataProy = parseInt(dataRecord.pe63_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe63_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePegsConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pegs_obje)
  let dataProy = 0
  if (columnfield === 'pegs_prim') {
    
    dataProy = parseInt(dataRecord.pegs_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pegs_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseReingresoConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.rein_obje)
  let dataProy = 0
  if (columnfield === 'rein_prim') {
    
    dataProy = parseInt(dataRecord.rein_prim)
  } else {
    
    dataProy = parseInt(dataRecord.rein_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

// eslint-disable-next-line sonarjs/no-identical-functions
const claseCapitalizacionConsolidado = (row, columnfield, value) => {
  if (value <= 0) {
    return `text-error`
  }
  
  return ``
}

const columnas = [
  {
    text: 'Corte',
    datafield: 'codi_cort',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Región',
    datafield: 'codi_area',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Nro zonas',
    datafield: 'tota_zona',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_tota_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_tota_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalConsolidado,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_tota_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_prim
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_tota_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_tota_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_segu
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_inco_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionConsolidado,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_inco_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_prim
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_inco_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_segu
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_rete_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionConsolidado,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_rete_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_prim
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_rete_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_segu
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'nume acti ante',
    datafield: 'nume_acti_ante',
    hidden: true,
  },
  {
    text: 'tota ingr ante',
    datafield: 'tota_ingr_ante',
    hidden: true,
  },
  {
    text: 'tota rein ante',
    datafield: 'tota_rein_ante',
    hidden: true,
  },
  {
    text: 'acti inic ante',
    datafield: 'acti_inic_ante',
    hidden: true,
  },
  {
    text: 'tota pedi ante',
    datafield: 'tota_pedi_ante',
    hidden: true,
  },
  {
    text: 'nume acti',
    datafield: 'nume_acti',
    hidden: true,
  },
  {
    text: 'acti nume prim',
    datafield: 'acti_nume_prim',
    hidden: true,
  },
  {
    text: 'acti nume segu',
    datafield: 'acti_nume_segu',
    hidden: true,
  },
  {
    text: 'Camp. ante.',
    datafield: 'acti_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaNumePedi = 0
          let sumaTotaIngr = 0
          let sumaTotaRein = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
            sumaActiInic = 0
          }
          sumaNumePedi += record.tota_pedi_ante
          sumaTotaIngr += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          sumaActiInic += record.acti_inic_ante

          let total = 0.0
          
          if (
          
            parseInt(sumaNumePedi) -
                    
                    parseInt(sumaTotaIngr) -
                    
                    parseInt(sumaTotaRein) >
                    0
                  
                  && parseInt(sumaActiInic) > 0
          ) {
            
            total =
                    100
                    
                    * ((parseInt(sumaNumePedi) -
                      
                      parseInt(sumaTotaIngr) -
                      
                      parseInt(sumaTotaRein)) /
                      
                      parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. % acti. camp.',
    datafield: 'acti_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'P2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaNumeActi = 0
          let sumaActiObje = 0
          if (record.visibleindex === 0) {
            sumaNumeActi = 0
            sumaActiObje = 0
          }
          sumaNumeActi += record.acti_inic
          sumaActiObje += record.acti_obje_pedi
          let total = 0
          
          if (parseInt(sumaNumeActi) > 0 && parseInt(sumaActiObje) > 0) {
            
            total =
                    100 * (parseFloat(sumaActiObje) / parseFloat(sumaNumeActi))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. pedi. act.',
    datafield: 'acti_obje_pedi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {   
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección (%)',
    datafield: 'acti_porc_prim',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaActiPrim = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaActiPrim = 0
            sumaActiInic = 0
          }
          sumaActiPrim += record.acti_prim
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiPrim) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiPrim) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'acti_porc_segu',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaActiSegu = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaActiSegu = 0
            sumaActiInic = 0
          }
          sumaActiSegu += record.acti_segu
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiSegu) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiSegu) / parseInt(sumaActiInic))
          }
          
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'acti_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadConsolidado,
  },
  {
    text: 'Rete. camp. ante.',
    datafield: 'cons_rete_camp_ante',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_rete_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'cons_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionConsolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'cons_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionConsolidado,
  },
  {
    text: '1 camp. ante.',
    datafield: 'cons_segu_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_segu_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '2 camp. ante.',
    datafield: 'cons_terc_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {        
        T: function (aggregatedValue, currentValue) {   
          aggregatedValue += currentValue

          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_terc_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '3 camp. ante.',
    datafield: 'cons_cuar_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_cuar_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Peg21',
    datafield: 'pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe21_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe21_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Consolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'pe21_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Consolidado,
  },
  {
    text: 'Peg42',
    datafield: 'pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe42_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe42_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Consolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'pe42_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Consolidado,
  },
  {
    text: 'Peg63',
    datafield: 'pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe63_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe63_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Consolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'pe63_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Consolidado,
  },
  {
    text: 'Pegs',
    datafield: 'pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pegs_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pegs_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsConsolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'pegs_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsConsolidado,
  },
  {
    text: 'Pos. rein.',
    datafield: 'rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'rein_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'rein_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoConsolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'rein_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoConsolidado,
  },
  {
    text: 'Obj. proyección',
    datafield: 'capi_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionConsolidado,
  },
  {
    text: 'Reproyección',
    datafield: 'capi_repr',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionConsolidado,
  },
  {
    text: 'Venta',
    datafield: 'tota_vent',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(por cobrar)',
    datafield: 'cobr',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(te puedes quedar)',
    datafield: 'cobr_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'd2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(por cobrar)',
    datafield: 'co92',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(te puedes quedar)',
    datafield: 'co92_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
]

const columnasZona = 
[
  {
    text: 'Corte',
    datafield: 'codi_cort',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Zona',
    datafield: 'codi_zona',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Gerente',
    datafield: 'nomb_vend',
    width: '250',
    align: 'center',
    cellsalign: 'left',
    pinned: true,
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_tota_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_tota_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_tota_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_prim
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_tota_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_tota_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_segu
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_inco_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_inco_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_prim
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_inco_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_segu
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_rete_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_rete_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_prim
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_rete_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let data = 0
          let obje = 0
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_segu
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'nume acti ante',
    datafield: 'nume_acti_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota ingr ante',
    datafield: 'tota_ingr_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota rein ante',
    datafield: 'tota_rein_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti inic ante',
    datafield: 'acti_inic_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota pedi ante',
    datafield: 'tota_pedi_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Camp. ante.',
    datafield: 'acti_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          let sumaNumePedi = 0
          let sumaTotaIngr = 0
          let sumaTotaRein = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
            sumaActiInic = 0
          }
          sumaNumePedi += record.tota_pedi_ante
          sumaTotaIngr += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          sumaActiInic += record.acti_inic_ante

          let total = 0.0
          
          if (
          
            parseInt(sumaNumePedi) -
                    
                    parseInt(sumaTotaIngr) -
                    
                    parseInt(sumaTotaRein) >
                    0
                  
                  && parseInt(sumaActiInic) > 0
          ) {
            
            total =
                    100
                    
                    * ((parseInt(sumaNumePedi) -
                      
                      parseInt(sumaTotaIngr) -
                      
                      parseInt(sumaTotaRein)) /
                      
                      parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'nume acti',
    datafield: 'nume_acti',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti nume prim',
    datafield: 'acti_nume_prim',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti nume segu',
    datafield: 'acti_nume_segu',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj.% acti. camp.',
    datafield: 'acti_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'P2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaNumeActi = 0
          let sumaActiObje = 0
          if (record.visibleindex === 0) {
            sumaNumeActi = 0
            sumaActiObje = 0
          }
          sumaNumeActi += record.acti_inic
          sumaActiObje += record.acti_obje_pedi
          let total = 0
          
          if (parseInt(sumaNumeActi) > 0 && parseInt(sumaActiObje) > 0) {
            
            total =
                    100 * (parseFloat(sumaActiObje) / parseFloat(sumaNumeActi))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. pedi. act.',
    datafield: 'acti_obje_pedi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección (%)',
    datafield: 'acti_porc_prim',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaActiPrim = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaActiPrim = 0
            sumaActiInic = 0
          }
          sumaActiPrim += record.acti_prim
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiPrim) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiPrim) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'acti_porc_segu',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          let sumaActiSegu = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaActiSegu = 0
            sumaActiInic = 0
          }
          sumaActiSegu += record.acti_segu
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiSegu) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiSegu) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'acti_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadZona,
  },
  {
    text: 'Rete. camp. ante.',
    datafield: 'cons_rete_camp_ante',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_rete_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'cons_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionZona,
  },
  {
    text: 'Reproyección',
    datafield: 'cons_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionZona,
  },
  {
    text: '1 Camp. ante.',
    datafield: 'cons_segu_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_segu_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '2 Camp. ante.',
    datafield: 'cons_terc_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_terc_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '3 Camp. ante.',
    datafield: 'cons_cuar_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_cuar_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Peg21',
    datafield: 'pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe21_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe21_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Zona,
  },
  {
    text: 'Reproyección',
    datafield: 'pe21_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Zona,
  },
  {
    text: 'Peg42',
    datafield: 'pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe42_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe42_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Zona,
  },
  {
    text: 'Reproyección',
    datafield: 'pe42_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Zona,
  },
  {
    text: 'Peg63',
    datafield: 'pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe63_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pe63_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Zona,
  },
  {
    text: 'Reproyección',
    datafield: 'pe63_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Zona,
  },
  {
    text: 'Pegs',
    datafield: 'pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pegs_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pegs_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsZona,
  },
  {
    text: 'Reproyección',
    datafield: 'pegs_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsZona,
  },
  {
    text: 'Pos. Rein.',
    datafield: 'rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'rein_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'rein_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoZona,
  },
  {
    text: 'Reproyección',
    datafield: 'rein_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoZona,
  },
  {
    text: 'Obj. proyección',
    datafield: 'capi_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionZona,
  },
  {
    text: 'Reproyección',
    datafield: 'capi_repr',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionZona,
  },
  {
    text: 'Venta',
    datafield: 'tota_vent',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(por cobrar)',
    datafield: 'cobr',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(te puedes quedar)',
    datafield: 'cobr_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'd2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(por cobrar)',
    datafield: 'co92',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(te puedes quedar)',
    datafield: 'co92_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
]

const columnasGrupo = [
  {
    text: 'Pedidos Totales',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },
  {
    text: 'Pedidos de retención',
    align: 'center',
    name: 'rete',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },
  {
    text: 'Consecutividad pedidos de retención 90%',
    align: 'center',
    name: 'cons_prim',
  },
  {
    text: 'Consecutividad 2do pedido 100%',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido 80%',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido 70%',
    align: 'center',
    name: 'cons_cuar',
  },
  {
    text: 'Peg21 40%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 30%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 25%',
    align: 'center',
    name: 'pe63',
  },
  {
    text: 'Suma de Pegs 35%',
    align: 'center',
    name: 'suma',
  },
  {
    text: 'Reingresos 10%',
    align: 'center',
    name: 'rein',
  },
  {
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
]

const columnasGrupoZona = [
  {
    text: 'Pedidos Totales',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },
  {
    text: 'Pedidos de retención',
    align: 'center',
    name: 'rete',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },
  {
    text: 'Consecutividad pedidos de retención 90%',
    align: 'center',
    name: 'cons_prim',
  },
  {
    text: 'Consecutividad 2do pedido 100%',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido 80%',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido 70%',
    align: 'center',
    name: 'cons_cuar',
  },
  {
    text: 'Peg21 40%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 30%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 25%',
    align: 'center',
    name: 'pe63',
  },
  {
    text: 'Suma de Pegs 35%',
    align: 'center',
    name: 'suma',
  },
  {
    text: 'Reingresos 10%',
    align: 'center',
    name: 'rein',
  },
  {
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'number' },
    { name: 'codi_area', type: 'string' },
    { name: 'tota_zona', type: 'number' },
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_cant', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_prim_porc', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_tota_segu_porc', type: 'number' },
    { name: 'pedi_inco_cant', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_prim_porc', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_inco_segu_porc', type: 'number' },
    { name: 'pedi_rete_cant', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_prim_porc', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'pedi_rete_segu_porc', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
    { name: 'acti_obje_pedi', type: 'number' },
    { name: 'acti_porc_prim', type: 'number' },
    { name: 'acti_prim', type: 'number' },
    { name: 'acti_porc_segu', type: 'number' },
    { name: 'acti_segu', type: 'number' },
    { name: 'cons_rete_camp_ante', type: 'number' },
    { name: 'cons_rete_obje', type: 'number' },
    { name: 'cons_rete_prim', type: 'number' },
    { name: 'cons_rete_segu', type: 'number' },
    { name: 'cons_segu_camp_ante', type: 'number' },
    { name: 'cons_segu_obje', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'cons_cuar_camp_ante', type: 'number' },
    { name: 'cons_cuar_obje', type: 'number' },
    { name: 'pe21', type: 'number' },
    { name: 'pe21_obje', type: 'number' },
    { name: 'pe21_prim', type: 'number' },
    { name: 'pe21_segu', type: 'number' },
    { name: 'pe42', type: 'number' },
    { name: 'pe42_obje', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
    { name: 'pe42_segu', type: 'number' },
    { name: 'pe63', type: 'number' },
    { name: 'pe63_obje', type: 'number' },
    { name: 'pe63_prim', type: 'number' },
    { name: 'pe63_segu', type: 'number' },
    { name: 'pegs', type: 'number' },
    { name: 'pegs_obje', type: 'number' },
    { name: 'pegs_prim', type: 'number' },
    { name: 'pegs_segu', type: 'number' },
    { name: 'rein', type: 'number' },
    { name: 'rein_obje', type: 'number' },
    { name: 'rein_prim', type: 'number' },
    { name: 'rein_segu', type: 'number' },
    { name: 'capi_obje', type: 'number' },
    { name: 'capi_repr', type: 'number' },
    { name: 'tota_vent', type: 'number' },
    { name: 'cobr', type: 'number' },
    { name: 'cobr_colc', type: 'number' },
    { name: 'co92', type: 'number' },
    { name: 'co92_colc', type: 'number' },
  ],
  datatype: 'json',
})

const sourceGlobalZona = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'number' },
    { name: 'codi_zona', type: 'string' },
    { name: 'nomb_vend', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_cant', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_prim_porc', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_tota_segu_porc', type: 'number' },
    { name: 'pedi_inco_cant', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_prim_porc', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_inco_segu_porc', type: 'number' },
    { name: 'pedi_rete_cant', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_prim_porc', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'pedi_rete_segu_porc', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
    { name: 'acti_obje_pedi', type: 'number' },
    { name: 'acti_porc_prim', type: 'number' },
    { name: 'acti_prim', type: 'number' },
    { name: 'acti_porc_segu', type: 'number' },
    { name: 'acti_segu', type: 'number' },
    { name: 'cons_rete_camp_ante', type: 'number' },
    { name: 'cons_rete_obje', type: 'number' },
    { name: 'cons_rete_prim', type: 'number' },
    { name: 'cons_rete_segu', type: 'number' },
    { name: 'cons_segu_camp_ante', type: 'number' },
    { name: 'cons_segu_obje', type: 'number' },
    { name: 'cons_terc_camp_ante', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'cons_cuar_camp_ante', type: 'number' },
    { name: 'cons_cuar_obje', type: 'number' },
    { name: 'pe21', type: 'number' },
    { name: 'pe21_obje', type: 'number' },
    { name: 'pe21_prim', type: 'number' },
    { name: 'pe21_segu', type: 'number' },
    { name: 'pe42', type: 'number' },
    { name: 'pe42_obje', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
    { name: 'pe42_segu', type: 'number' },
    { name: 'pe63', type: 'number' },
    { name: 'pe63_obje', type: 'number' },
    { name: 'pe63_prim', type: 'number' },
    { name: 'pe63_segu', type: 'number' },
    { name: 'pegs', type: 'number' },
    { name: 'pegs_obje', type: 'number' },
    { name: 'pegs_prim', type: 'number' },
    { name: 'pegs_segu', type: 'number' },
    { name: 'rein', type: 'number' },
    { name: 'rein_obje', type: 'number' },
    { name: 'rein_prim', type: 'number' },
    { name: 'rein_segu', type: 'number' },
    { name: 'capi_obje', type: 'number' },
    { name: 'capi_repr', type: 'number' },
    { name: 'tota_vent', type: 'number' },
    { name: 'cobr', type: 'number' },
    { name: 'cobr_colc', type: 'number' },
    { name: 'co92', type: 'number' },
    { name: 'co92_colc', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const adaptadorGlobalZona = new jqx.dataAdapter(sourceGlobalZona.value)

const refGridGlobal = ref()
const refGridGlobalZona = ref()

const localization = appStore.localization

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Proyección región`)
  await obtenerCampana()
  await obtenerArea()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas/futuras`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 40)
    
    itemCampana.forEach(element => 
      campanaOptions.value.push({
        id: element.codi_camp,
        text: element.codi_camp,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerArea = async () => {
  try {
    appStore.mensaje('Obteniendo región')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/areas`, {
      method: "get",
      query: {
        codigo: userData.codi_perf,
      },
    })

    const itemArea = data.data_glob
    
    itemArea.forEach(element => 
      areaOptions.value.push({
        id: element.codi_area,
        text: element.codi_area,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    general.value = {
      objetivoIncorporacion: '0',
      proyeccionIncorporacion: '0',
      proyeccionPorcentajeIncorporacion: '0.00',
      reproyeccionIncorporacion: '0',
      reproyeccionPorcentajeIncorporacion: '0.00',
      objetivoRetencion: '0',
      proyeccionRetencion: '0',
      proyeccionPorcentajeRetencion: '0.00',
      reproyeccionRetencion: '0',
      reproyeccionPorcentajeRetencion: '0',
      objetivoActividad: '0.00',
      proyeccionActividad: '0.00',
      proyeccionPorcentajeActividad: '0.00',
      reproyeccionActividad: '0.00',
      reproyeccionPorcentajeActividad: '0.00',
    }

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        area: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    sourceGlobal.value.localdata =  data.data_cons
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    sourceGlobalZona.value.localdata =  data.data_glob
    refGridGlobalZona.value.updatebounddata('cells')
    refGridGlobalZona.value.refreshfilterrow()

    general.value = {
      objetivoIncorporacion: data.obje_inco,
      proyeccionIncorporacion: data.obje_inco_proy,
      proyeccionPorcentajeIncorporacion: data.obje_inco_proy_porc,
      reproyeccionIncorporacion: data.obje_inco_repr,
      reproyeccionPorcentajeIncorporacion: data.obje_inco_repr_porc,
      objetivoRetencion: data.obje_rete,
      proyeccionRetencion: data.obje_rete_proy,
      proyeccionPorcentajeRetencion: data.obje_rete_proy_porc,
      reproyeccionRetencion: data.obje_rete_repr,
      reproyeccionPorcentajeRetencion: data.obje_rete_repr_porc,
      objetivoActividad: data.obje_acti,
      proyeccionActividad: data.obje_acti_proy,
      proyeccionPorcentajeActividad: data.obje_acti_proy_porc,
      reproyeccionActividad: data.obje_acti_repr,
      reproyeccionPorcentajeActividad: data.obje_acti_repr_porc,
    }
    
  } catch (error) {
    console.log(error)
    if (typeof error.response != "undefined") {
      const { data } = error.response._data    
      if (typeof data != "undefined") {
        for (var key in data)
        {
          if (key == 'campana') {
            errorCampana.value = true
            errorMensajeCampana.value = data[key]
          }
          if (key == 'area') {
            errorArea.value = true
            errorMensajeArea.value = data[key]
          }
        }
      }
    }
    
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    area: null,
  }
  general.value = {
    objetivoIncorporacion: '0',
    proyeccionIncorporacion: '0',
    proyeccionPorcentajeIncorporacion: '0.00',
    reproyeccionIncorporacion: '0',
    reproyeccionPorcentajeIncorporacion: '0.00',
    objetivoRetencion: '0',
    proyeccionRetencion: '0',
    proyeccionPorcentajeRetencion: '0.00',
    reproyeccionRetencion: '0',
    reproyeccionPorcentajeRetencion: '0',
    objetivoActividad: '0.00',
    proyeccionActividad: '0.00',
    proyeccionPorcentajeActividad: '0.00',
    reproyeccionActividad: '0.00',
    reproyeccionPorcentajeActividad: '0.00',
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()

  sourceGlobalZona.value.localdata = []
  refGridGlobalZona.value.updatebounddata('cells')
  refGridGlobalZona.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-region/excel`, {
      method: "post",
      body: {
        general: general.value,
        variable: selectedVariable.value,
        cabecera_corte: cabecera.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
        cabecera_zona: cabeceraZona.value,
        detalle_zona: JSON.stringify(refGridGlobalZona.value.exportdata('xml')),
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorArea.value = false
  errorMensajeArea.value = ''
}

const columnsOcultarTodo = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarTodo = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarPedidosTotales = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
]

const columnsMostrarPedidosActividad = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
]

const columnsMostrarPedidosRetencion = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
]

const columnsMostrarCapitalizacion = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
]

const columnsMostrarCobranza = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividad = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]


const columnsOcultarTodoZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarTodoZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarPedidosTotalesZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
]

const columnsMostrarPedidosActividadZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
]

const columnsMostrarPedidosRetencionZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
]

const columnsMostrarCapitalizacionZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
]

const columnsMostrarCobranzaZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividadZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]

watch(selectedVariable, async (nuevaVariable, antiguaVariable) => {
  refGridGlobal.value.beginupdate()
  refGridGlobalZona.value.beginupdate()

  columnsOcultarTodo.forEach(column => {
    refGridGlobal.value.hidecolumn(column)
  })
  columnsOcultarTodoZona.forEach(column => {
    refGridGlobalZona.value.hidecolumn(column)
  })
  
  if (nuevaVariable === 0) {
    columnsMostrarTodo.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarTodoZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 1) {
    columnsMostrarPedidosTotales.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosTotalesZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 2) {
    columnsMostrarPedidosActividad.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosActividadZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 3) {
    columnsMostrarPedidosRetencion.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosRetencionZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 4) {
    columnsMostrarCapitalizacion.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarCapitalizacionZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 5) {
    columnsMostrarCobranza.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarCobranzaZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 6) {
    columnsMostrarConsecutividad.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarConsecutividadZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  }
  refGridGlobal.value.endupdate()
  refGridGlobalZona.value.endupdate()
})
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar proyección">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.campana"
                      :items="campanaOptions"
                      label="Campaña"
                      placeholder="Seleccionar campaña"
                      item-title="text"
                      item-value="id"
                      :error="errorCampana"
                      :error-messages="errorMensajeCampana"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.area"
                      :items="areaOptions"
                      label="Región"
                      placeholder="Seleccionar region"
                      item-title="text"
                      item-value="id"
                      :error="errorArea"
                      :error-messages="errorMensajeArea"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Información general">
              <VCardText>
                <VTable
                  density="compact" 
                  class="text-no-wrap"
                >
                  <thead>
                    <tr>
                      <th class="text-uppercase">
                        CONCEPTO
                      </th>
                      <th class="text-uppercase">
                        OBJ. ZONA
                      </th>
                      <th class="text-uppercase">
                        PROYECCIÓN
                      </th>
                      <th class="text-uppercase">
                        % PROYECCIÓN
                      </th>
                      <th class="text-uppercase">
                        REPROYECCIÓN
                      </th>
                      <th class="text-uppercase">
                        % REPROYECCIÓN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.proyeccionIncorporacion }}</td>
                      <td>{{ general.proyeccionPorcentajeIncorporacion }}</td>
                      <td>{{ general.reproyeccionIncorporacion }}</td>
                      <td>{{ general.reproyeccionPorcentajeIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.proyeccionRetencion }}</td>
                      <td>{{ general.proyeccionPorcentajeRetencion }}</td>
                      <td>{{ general.reproyeccionRetencion }}</td>
                      <td>{{ general.reproyeccionPorcentajeRetencion }}</td>
                    </tr>
                    <tr>
                      <td>% Actividad</td>
                      <td>{{ general.objetivoActividad }}</td>
                      <td>{{ general.proyeccionActividad }}</td>
                      <td>{{ general.proyeccionPorcentajeActividad }}</td>
                      <td>{{ general.reproyeccionActividad }}</td>
                      <td>{{ general.reproyeccionPorcentajeActividad }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Variables">
              <VCardText>
                <VRadioGroup
                  v-model="selectedVariable"
                  inline
                >
                  <div>
                    <VRadio
                      v-for="variable in variables"
                      :key="variable.value"
                      :label="variable.title"
                      :value="variable.value"
                      color="secondary"
                    />
                  </div>
                </VRadioGroup>
              </VCardText>
            </VCard>
          </VCol>
      
          <VCol cols="12">
            <VCard title="Consolidado por corte">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnas"
                  :source="adaptadorGlobal"
                  :columngroups="columnasGrupo"
                  columnsresize
                  :columnsautoresize="false"
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  showstatusbar
                  showaggregates
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  editable
                  editmode="click"
                />
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Detalle por zona">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobalZona"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasZona"
                  :source="adaptadorGlobalZona"
                  :columngroups="columnasGrupoZona"
                  columnsresize
                  :columnsautoresize="false"
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  showstatusbar
                  showaggregates
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  editable
                  editmode="click"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
