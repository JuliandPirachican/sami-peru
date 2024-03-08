<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_proy_camp_regi',
    subject: 'peru/repo_come_proy_camp_regi',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
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

const headersCorte = computed(() => {
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

const headersZona = computed(() => {
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
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

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
    itemsCorte.value = []
    itemsZona.value = []

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        area: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    itemsCorte.value = data.data_cons
    itemsZona.value = data.data_glob
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
  itemsCorte.value = []
  itemsZona.value = []
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
        data_corte: itemsCorte.value,
        cabecera_corte: headersCorte.value,
        data_zona: itemsZona.value,
        cabecera_zona: headersZona.value,
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
                <VDataTable
                  :headers="headersCorte"
                  :items="itemsCorte"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="400"
                > 
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        REGIÓN
                      </th>
                      <th rowspan="2">
                        NRO ZONAS
                      </th>
                      <th rowspan="2">
                        ACT. INIC.
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1"
                        class="text-center"
                        colspan="5"
                      >
                        PEDIDOS TOTALES
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4"
                        class="text-center"
                        colspan="5"
                      >
                        INCORPORACIÓN
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3"
                        class="text-center"
                        colspan="5"
                      >
                        PEDIDOS DE RETENCIÓN
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2"
                        class="text-center"
                        colspan="7"
                      >
                        % ACTIVIDAD
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                        class="text-center"
                        colspan="4"
                      >
                        CONSECUTIVIDAD PEDIDOS DE RETENCIÓN 90%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 2do pedido 100%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 3er pedido 80%'
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 4to pedido 70%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Peg21 40%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Peg42 30%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4"
                        class="text-center"
                        colspan="4"
                      >
                        Peg63 25%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Suma Pegs 35%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4"
                        class="text-center"
                        colspan="4"
                      >
                        Reingresos 10%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 4"
                        class="text-center"
                        colspan="2"
                      >
                        Capitalización
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        VENTA
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 88%(POR COBRAR)
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 88%(TE PUEDES QUEDAR)
                      </th>

                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 92%(POR COBRAR)
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 92%(TE PUEDES QUEDAR)
                      </th>
                    </tr>
                    <tr>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. % ACTI. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. PEDI. ACT.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        RETE. CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        1 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        2 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        3 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEG21
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEG42
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        PEG63
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEGS
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        POS. REIN.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                    </tr>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Detalle por zona">
              <VCardText>
                <VDataTable
                  :headers="headersZona"
                  :items="itemsZona"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="400"
                > 
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        ZONA
                      </th>
                      <th rowspan="2">
                        GERENTE
                      </th>
                      <th rowspan="2">
                        ACT. INIC.
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1"
                        class="text-center"
                        colspan="5"
                      >
                        PEDIDOS TOTALES
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4"
                        class="text-center"
                        colspan="5"
                      >
                        INCORPORACIÓN
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3"
                        class="text-center"
                        colspan="5"
                      >
                        PEDIDOS DE RETENCIÓN
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2"
                        class="text-center"
                        colspan="7"
                      >
                        % ACTIVIDAD
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                        class="text-center"
                        colspan="4"
                      >
                        CONSECUTIVIDAD PEDIDOS DE RETENCIÓN 90%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 2do pedido 100%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 3er pedido 80%'
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 6"
                        class="text-center"
                        colspan="2"
                      >
                        CONSECUTIVIDAD 4to pedido 70%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Peg21 40%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Peg42 30%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4"
                        class="text-center"
                        colspan="4"
                      >
                        Peg63 25%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                        class="text-center"
                        colspan="4"
                      >
                        Suma Pegs 35%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4"
                        class="text-center"
                        colspan="4"
                      >
                        Reingresos 10%
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 4"
                        class="text-center"
                        colspan="2"
                      >
                        Capitalización
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        VENTA
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 88%(POR COBRAR)
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 88%(TE PUEDES QUEDAR)
                      </th>

                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 92%(POR COBRAR)
                      </th>
                      <th
                        v-if="selectedVariable === 0 || selectedVariable === 5"
                        rowspan="2"
                      >
                        COBRANZA 92%(TE PUEDES QUEDAR)
                      </th>
                    </tr>
                    <tr>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        OBJ. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. % ACTI. CAMP.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. PEDI. ACT.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        PROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        REPROYECCIÓN (%)
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        RETE. CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        1 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        2 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        3 CAMP. ANTE.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 6">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEG21
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEG42
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        PEG63
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        PEGS
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        POS. REIN.
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. FORM. ÉXITO
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 4">
                        OBJ. PROYECCIÓN
                      </th>
                      <th v-if="selectedVariable === 0 || selectedVariable === 4">
                        REPROYECCIÓN
                      </th>
                    </tr>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
