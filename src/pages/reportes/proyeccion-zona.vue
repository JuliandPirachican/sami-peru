<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"

definePage({
  meta: {
    action: 'peru/repo_come_proy_camp',
    subject: 'peru/repo_come_proy_camp',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const getClassByValue = value => {
  const data = parseFloat(value).toFixed(2)
  
  return 'text-success'
}

const claseCumplimientoObjetivo = (row, columnfield, value) => getClassByValue(value)

const formulario = ref({
  campana: null,
  zona: null,
})

const general = ref({
  lima: '',
  objetivoIncorporacion: '0',
  proyeccionIncorporacion: '0',
  reproyeccionIncorporacion: '0',
  objetivoRetencion: '0',
  proyeccionRetencion: '0',
  reproyeccionRetencion: '0',
  objetivoActividad: '0.00',
  proyeccionActividad: '0.00',
  reproyeccionActividad: '0.00',
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

const columnas = ref([
  { title: 'Objetivo formula éxito', value: 0 },
  { title: 'Objetivo proyección', value: 1 },
  { title: 'Objetivo reproyección', value: 2 },
])

const selectedVariable = ref(0)
const selectedColumna = ref(0)

const items = ref([])

const cabecera = computed(() => {
  if (selectedColumna.value >= 2) {
    if(selectedVariable.value === 0) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_tota_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_tota_segu',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_inco_segu',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_rete_segu',
        },
        {
          title: 'Camp. ante.',
          key: 'acti_camp_ante',
        },
        {
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
        {
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if (selectedVariable.value === 1) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_tota_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_tota_segu',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_inco_segu',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_rete_segu',
        },
      ]
    } else if(selectedVariable.value === 2) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_rete_segu',
        },
        {
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if(selectedVariable.value === 4) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Reproyección',
          key: 'pedi_inco_segu',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
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
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. form. éxito',
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
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
      ]
    }
    
  } else if (selectedColumna.value >= 1) {
    if(selectedVariable.value === 0) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_tota_prim',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
        {
          title: 'Camp. ante.',
          key: 'acti_camp_ante',
        },
        {
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
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
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'cons_rete_prim',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe21_prim',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe42_prim',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe63_prim',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pegs_prim',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'rein_prim',
        },
        {
          title: 'Obj. proyección',
          key: 'capi_obje',
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
        {
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if (selectedVariable.value === 1) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_tota_prim',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
      ]
    } else  if(selectedVariable.value === 2) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
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
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'cons_rete_prim',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe21_prim',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe42_prim',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe63_prim',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pegs_prim',
        },
      ]
    } else if(selectedVariable.value === 3) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_rete_prim',
        },
        {
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'cons_rete_prim',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe21_prim',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe42_prim',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe63_prim',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pegs_prim',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'rein_prim',
        },
        {
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if(selectedVariable.value === 4) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pedi_inco_prim',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'pe63_prim',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'rein_prim',
        },
        {
          title: 'Obj. proyección',
          key: 'capi_obje',
        },
      ]
    } else if(selectedVariable.value === 5) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'cons_rete_prim',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
      ]
    }
  } else {
    if(selectedVariable.value === 0) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Camp. ante.',
          key: 'acti_camp_ante',
        },
        {
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
          key: 'acti_obje_pedi',
        },
        {
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'capi_obje',
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
        {
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if (selectedVariable.value === 1) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_tota_obje',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
      ]
    } else  if(selectedVariable.value === 2) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. %',
          key: 'acti_obje',
        },
        {
          title: 'Obje. pedi.',
          key: 'acti_obje_pedi',
        },
        {
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
      ]
    } else if(selectedVariable.value === 3) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_rete_obje',
        },
        {
          title: 'Rete. camp. ante.',
          key: 'cons_rete_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: 'Peg21',
          key: 'pe21',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe21_obje',
        },
        {
          title: 'Peg42',
          key: 'pe42',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe42_obje',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Pegs',
          key: 'pegs',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pegs_obje',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Nivel lider obje. proy.',
          key: 'nive_lide',
        },
      ]
    } else if(selectedVariable.value === 4) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
          key: 'nomb_vend',
        },
        {
          title: 'Act. inic.',
          key: 'acti_inic',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pedi_inco_obje',
        },
        {
          title: 'Peg63',
          key: 'pe63',
        },
        {
          title: 'Obje. form. éxito',
          key: 'pe63_obje',
        },
        {
          title: 'Pos. rein.',
          key: 'rein',
        },
        {
          title: 'Obje. form. éxito',
          key: 'rein_obje',
        },
        {
          title: 'Obj. proyección',
          key: 'capi_obje',
        },
      ]
    } else if(selectedVariable.value === 5) {
      return [
        {
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Sector',
          key: 'codi_sect',
        },
        {
          title: 'Lider',
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
          title: 'Obje. form. éxito',
          key: 'cons_rete_obje',
        },
        {
          title: '1 Camp. ante.',
          key: 'cons_segu_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_segu_obje',
        },
        {
          title: '2 Camp. ante.',
          key: 'cons_terc_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_terc_obje',
        },
        {
          title: '3 Camp. ante.',
          key: 'cons_cuar_camp_ante',
        },
        {
          title: 'Obje. form. éxito',
          key: 'cons_cuar_obje',
        },
      ]
    }
  }
  
})

const colum = [
  {
    text: 'Sector',
    datafield: 'codi_sect',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    filtertype: 'checkedlist',
    pinned: true,
  },
  {
    text: 'Lider',
    datafield: 'nomb_vend',
    width: '300',
    align: 'center',
    cellsalign: 'left',
    editable: false,
    pinned: true,
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_inic',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: true,
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
    text: 'Obje. form. éxito',
    datafield: 'pedi_tota_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'tota',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'tota',
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
    text: 'Reproyección',
    datafield: 'pedi_tota_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'tota',
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
    text: 'Obje. form. éxito',
    datafield: 'pedi_inco_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'inco',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'inco',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname() {
      return 'text-secondary bg-primary-light'
    },
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_inco_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'inco',
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
    text: 'Obje. form. éxito',
    datafield: 'pedi_rete_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rete',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rete',
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
    text: 'Reproyección',
    datafield: 'pedi_rete_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rete',
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
    text: 'camp. ante.',
    datafield: 'acti_camp_ante',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'acti',
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
          sumaNumePedi += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          sumaActiInic += record.acti_inic_ante
          let total = 0

          // eslint-disable-next-line radix
          const calculo = parseInt(sumaNumePedi)
                  // eslint-disable-next-line radix
                  - parseInt(sumaTotaIngr)
                  // eslint-disable-next-line radix
                  - parseInt(sumaTotaRein)

          // eslint-disable-next-line radix
          const activas = parseInt(sumaActiInic)
          if (calculo > 0 && activas > 0) {
            total = 100 * (calculo / activas)
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. %.',
    datafield: 'acti_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    cellclassname: claseCumplimientoObjetivo,
    columngroup: 'acti',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue, column, record) {
          let sumaActiInic = 0
          let sumaActiObjePedi = 0 
          if (record.visibleindex === 0) {
            sumaActiInic = 0
            sumaActiObjePedi = 0
          }
          sumaActiInic += record.acti_inic
          sumaActiObjePedi += record.acti_obje_pedi
          let total = 0
          // eslint-disable-next-line
                if (
          // eslint-disable-next-line radix
            parseInt(sumaActiInic) > 0
                  && parseFloat(sumaActiObjePedi) > 0
          ) {
            // eslint-disable-next-line
                  total =
                    100
                    // eslint-disable-next-line radix
                    * (parseFloat(sumaActiObjePedi) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. pedi.',
    datafield: 'acti_obje_pedi',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    text: 'Proyección (%)',
    datafield: 'acti_porc_prim',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'acti',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue, column, record) {
          let sumaActiPrim = 0
          let sumaActiInic = 0
          if (record.visibleindex === 0) {
            sumaActiPrim = 0
            sumaActiInic = 0
          }
          sumaActiPrim += record.acti_prim
          sumaActiInic += record.acti_inic
          let total = 0
          // eslint-disable-next-line
                if (
          // eslint-disable-next-line radix
            parseInt(sumaActiPrim) > 0
                  // eslint-disable-next-line radix
                  && parseInt(sumaActiInic) > 0
          ) {
            // eslint-disable-next-line
                  total =
                    100 * (parseFloat(sumaActiPrim) / parseFloat(sumaActiInic))
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
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
    text: 'Reproyección (%)',
    datafield: 'acti_porc_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
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
          // eslint-disable-next-line radix
            parseInt(sumaActiSegu) > 0
                  && parseFloat(sumaActiInic) > 0
          ) {
            // eslint-disable-next-line
                  total =
                    // eslint-disable-next-line radix
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    text: 'Rete. camp. ante.',
    datafield: 'cons_rete_camp_ante',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_prim',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_prim',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_prim',
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
    text: 'Reproyección',
    datafield: 'cons_rete_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_prim',
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
    text: '1 Camp. ante.',
    datafield: 'cons_segu_camp_ante',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_segu',
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
    text: 'Obje. form. éxito',
    datafield: 'cons_segu_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_segu',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_terc',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_terc',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_cuar',
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
    text: 'Obje. form. éxito',
    datafield: 'cons_cuar_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons_cuar',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe21',
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
    text: 'Obje. form. éxito',
    datafield: 'pe21_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe21',
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
    text: 'Obj. proyección.',
    datafield: 'pe21_prim',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe21',
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
    text: 'Reproyección',
    datafield: 'pe21_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe21',
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
    text: 'Peg42',
    datafield: 'pe42',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe42',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe42',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe42',
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
    text: 'Reproyección',
    datafield: 'pe42_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe42',
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
    text: 'Peg63',
    datafield: 'pe63',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe63',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe63',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe63',
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
    text: 'Reproyección',
    datafield: 'pe63_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe63',
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
    text: 'Pegs',
    datafield: 'pegs',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'suma',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'suma',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'suma',
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
    text: 'Reproyección',
    datafield: 'pegs_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'suma',
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
    text: 'Pos. rein.',
    datafield: 'rein',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rein',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rein',
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rein',
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
    text: 'Reproyección',
    datafield: 'rein_segu',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rein',
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
    datafield: 'capi_obje',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'capi',
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
    text: 'Reproyección',
    datafield: 'capi_repr',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'capi',
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
    text: 'Venta',
    datafield: 'tota_vent',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    width: '250',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    width: '250',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    width: '250',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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
    text: 'Nivel lider obje. proy.',
    datafield: 'nive_lide',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    editable: false,
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

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_vend', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_obje', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_inco_obje', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_rete_obje', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
    { name: 'nume_acti', type: 'number' },
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
    { name: 'nive_lide', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()

const localization = appStore.localization

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))


const onEditar = event => {
  const { args } = event
  const columnDataField = args.datafield
  const rowIndex = args.rowindex
  const cellValue = args.value
  if (columnDataField === 'pedi_inco_prim') {
    let pedidoIncorporacion = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
    let pedidoRetencion = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')

    let pedidoTotaPrim = parseInt(pedidoIncorporacion) + parseInt(pedidoRetencion)
    
    if (!Number.isNaN(pedidoIncorporacion) && pedidoIncorporacion !== '') {
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pedidoTotaPrim)
    }
  } else if (columnDataField === 'pedi_inco_segu') {
    const pedidoIncorporacion =  refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
    const pedidoRetencion = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_segu')
    if (!Number.isNaN(pedidoIncorporacion) && pedidoIncorporacion !== '') {
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', parseInt(pedidoIncorporacion) + parseInt(pedidoRetencion))
    }
  } else if (columnDataField === 'acti_obje') {
    const actiObje = parseFloat(refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_obje')).toFixed(2)
    const actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
    if (!Number.isNaN(actiObje)) {
      let actiObjePedi = 0
      if (actiInic !== '0' && actiObje !== '0') {
        actiObjePedi = (actiInic * actiObje) / 100
        actiObjePedi = parseFloat(actiObjePedi).toFixed(2)
        actiObjePedi = Math.ceil(actiObjePedi)
      }

      if (actiObje > 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'nume_acti', 1)
      } else {
        refGridGlobal.value.setcellvalue(rowIndex, 'nume_acti', 0)
      }
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_obje_pedi', actiObjePedi)
    }
  } else if (columnDataField === 'cons_rete_prim') {
    const consRetePrim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_prim'))
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let pe21Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim')
    let pe42Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    if (!Number.isNaN(consRetePrim)) {
      consSeguObje = parseInt(consSeguObje)
      pe21Prim = parseInt(pe21Prim)
      pe42Prim = parseInt(pe42Prim)
      pe63Prim = parseInt(pe63Prim)
      reinPrim = parseInt(reinPrim)
      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
      pediRetePrim = parseInt(pediRetePrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_prim', pediRetePrim)
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
      actiPrim = parseInt(actiPrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_prim', actiPrim)

      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_prim', actiPorcPrim)
      }
      const pediIncoPrim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim'))
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pediTotaPrim)
      }         
    }
  } else if (columnDataField === 'cons_rete_segu') {
    const consReteSegu = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_segu'))
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let pe21Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_segu')
    let pe42Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_segu')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    if (!Number.isNaN(consReteSegu)) {
      consSeguObje = parseInt(consSeguObje)
      pe21Segu = parseInt(pe21Segu)
      pe42Segu = parseInt(pe42Segu)
      pe63Segu = parseInt(pe63Segu)
      reinSegu = parseInt(reinSegu)
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
      pediReteSegu = parseInt(pediReteSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_segu', pediReteSegu)
      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
      actiSegu = parseInt(actiSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_segu', actiSegu)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
            
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_segu', actiPorcSegu)
      }
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
      let pediRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', pediTotaSegu)
      }
    } 
  } else if (columnDataField === 'pe21_prim') {
    const pe21Prim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim'))
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_prim')
    let pe42Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    if (!Number.isNaN(pe21Prim)) {
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe42Prim = parseInt(pe42Prim)
      pe63Prim = parseInt(pe63Prim)
      reinPrim = parseInt(reinPrim)

      const pegsPrim = pe63Prim + pe42Prim + pe21Prim

      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_prim', pegsPrim)
      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
      
      pediRetePrim = parseInt(pediRetePrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_prim', pediRetePrim)
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
      
      actiPrim = parseInt(actiPrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_prim', actiPrim)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_prim', actiPorcPrim)
      }
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_segu')
      let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
      
      pediIncoPrim = parseInt(pediIncoPrim)
      
      pediReteObje = parseInt(pediReteObje)
      
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        
        pediTotaPrim = parseInt(pediTotaPrim)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pediTotaPrim)
      }
    }
  } else if (columnDataField === 'pe21_segu') {
    const pe21Segu = parseInt(cellValue)
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_segu')
    let pe42Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_segu')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    if (!Number.isNaN(pe21Segu)) {
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe42Segu = parseInt(pe42Segu)
      pe63Segu = parseInt(pe63Segu)
      reinSegu = parseInt(reinSegu)

      const pegsSegu = pe63Segu + pe42Segu + pe21Segu
      
      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_segu', pegsSegu)
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
      
      pediReteSegu = parseInt(pediReteSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_segu', pediReteSegu)

      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
      
      actiSegu = parseInt(actiSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_segu', actiSegu)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_segu', actiPorcSegu)
      }
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
      let pediRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', pediTotaSegu)
      }
    }
  } else if (columnDataField === 'pe42_prim') {
    const pe42Prim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim'))
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_prim')
    let pe21Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    if (!Number.isNaN(pe42Prim)) {
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe21Prim = parseInt(pe21Prim)
      pe63Prim = parseInt(pe63Prim)
      reinPrim = parseInt(reinPrim)
    
      const pegsPrim = pe63Prim + pe42Prim + pe21Prim
  
      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_prim', pegsPrim)
      let pediRetePrim = consRetePrim
                + consSeguObje
                + pe21Prim
                + pe42Prim
                + pe63Prim
                + reinPrim
              
      pediRetePrim = parseInt(pediRetePrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_prim', pediRetePrim)
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
              
      actiPrim = parseInt(actiPrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_prim', actiPrim)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_prim', actiPorcPrim)
      }
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_segu')
      let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
                
        pediTotaPrim = parseInt(pediTotaPrim)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pediTotaPrim)
      }
    }
  } else if (columnDataField === 'pe42_segu') {
    const pe42Segu = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_segu'))
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_segu')
    let pe21Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_segu')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    if (!Number.isNaN(pe42Segu)) {
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe21Segu = parseInt(pe21Segu)
      pe63Segu = parseInt(pe63Segu)
      reinSegu = parseInt(reinSegu)
    
      const pegsSegu = pe63Segu + pe42Segu + pe21Segu
    
      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_segu', pegsSegu)
      let pediReteSegu = consReteSegu
                + consSeguObje
                + pe21Segu
                + pe42Segu
                + pe63Segu
                + reinSegu
              
      pediReteSegu = parseInt(pediReteSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_segu', pediReteSegu)

      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
              
      actiSegu = parseInt(actiSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_segu', actiSegu)
      
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_segu', actiPorcSegu)
      }
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
      let pediRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', pediTotaSegu)
      }
    }
  } else if (columnDataField === 'pe63_prim') {
    let pe63 = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63')
    let pe63Obje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje')
    let pe63Prim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim'))
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let reinObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    let pediIncoObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje')
    let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
    let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_prim')
    let pe21Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim')
    let pe42Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim')
    if (!Number.isNaN(pe63Prim)) {
      pe63 = parseInt(pe63)
      pe63Obje = parseInt(pe63Obje)
      pe63Prim = parseInt(pe63Prim)
      pe63Segu = parseInt(pe63Segu)
      reinObje = parseInt(reinObje)
      reinPrim = parseInt(reinPrim)
      reinSegu = parseInt(reinSegu)
      pediIncoObje = parseInt(pediIncoObje)
      pediIncoPrim = parseInt(pediIncoPrim)
      pediIncoSegu = parseInt(pediIncoSegu)
      let totaSali = 0
      let totaInco = 0
      let totaRein = 0
      if (selectedColumna.value === 2) {
        totaSali = pe63Segu
        totaInco = pediIncoSegu
        totaRein = reinSegu
      } else if (selectedColumna.value === 1) {
        totaSali = pe63Prim
        totaInco = pediIncoPrim
        totaRein = reinPrim
      } else {
        totaSali = pe63Obje
        totaInco = pediIncoObje
        totaRein = reinObje
      }
      if (pe63 > 0) {
        totaSali = pe63 - totaSali
      }
      if (totaSali < 0) {
        totaSali = 0
      }
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe21Prim = parseInt(pe21Prim)
      pe42Prim = parseInt(pe42Prim)

      const pegsPrim = pe63Prim + pe42Prim + pe21Prim

      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_prim', pegsPrim)

      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
          
      pediRetePrim = parseInt(pediRetePrim)

      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_prim', pediRetePrim)
          
      const actiPrim = parseInt(
        consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim,
      )

      refGridGlobal.value.setcellvalue(rowIndex, 'acti_prim', actiPrim)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
            
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_prim', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_prim', actiPorcPrim)
      }
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      refGridGlobal.value.setcellvalue(rowIndex, 'capi_obje', capiObje)
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_segu')
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pediTotaPrim)
      }
    }
  } else if (columnDataField === 'pe63_segu') {
    let pe63 = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let pe63Obje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje')
    let reinObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    let pediIncoObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje')
    let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
    let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_segu')
    let pe21Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_segu')
    let pe42Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_segu')
    if (!Number.isNaN(pe63Segu)) {
      pe63 = parseInt(pe63)
      pe63Obje = parseInt(pe63Obje)
      pe63Prim = parseInt(pe63Prim)
      pe63Segu = parseInt(pe63Segu)
      reinObje = parseInt(reinObje)
      reinPrim = parseInt(reinPrim)
      reinSegu = parseInt(reinSegu)
      pediIncoObje = parseInt(pediIncoObje)
      pediIncoPrim = parseInt(pediIncoPrim)
      pediIncoSegu = parseInt(pediIncoSegu)
      let totaSali = 0
      let totaInco = 0
      let totaRein = 0
      if (selectedColumna.value === 2) {
        totaSali = pe63Segu
        totaInco = pediIncoSegu
        totaRein = reinSegu
      } else if (selectedColumna.value === 1) {
        totaSali = pe63Prim
        totaInco = pediIncoPrim
        totaRein = reinPrim
      } else {
        totaSali = pe63Obje
        totaInco = pediIncoObje
        totaRein = reinObje
      }

      if (pe63 > 0) {
        totaSali = pe63 - totaSali
      }

      if (totaSali < 0) {
        totaSali = 0
      }
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe21Segu = parseInt(pe21Segu)
      pe42Segu = parseInt(pe42Segu)

      const pegsSegu = pe63Segu + pe42Segu + pe21Segu

      refGridGlobal.value.setcellvalue(rowIndex, 'pegs_segu', pegsSegu)
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
      pediReteSegu = parseInt(pediReteSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_segu', pediReteSegu)
      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
          
      actiSegu = parseInt(actiSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'acti_segu', actiSegu)
      let actiInic = refGridGlobal.value.getcellvaluebyid(rowIndex, 'acti_inic')
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 1)
        } else {
          refGridGlobal.value.setcellvalue(rowIndex, 'acti_nume_segu', 0)
        }
        refGridGlobal.value.setcellvalue(rowIndex, 'acti_porc_segu', actiPorcSegu)
      }
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
          
      capiObje = parseInt(capiObje)
      refGridGlobal.value.setcellvalue(rowIndex, 'capi_repr', capiObje)
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', pediTotaSegu)
      }
    }
  } else if (columnDataField === 'rein_prim') {
    let pe63 = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let pe63Obje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje')
    let reinObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje')
    let reinPrim = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim'))
    let reinSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu')
    let pediIncoObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje')
    let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
    let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_prim')
    let pe21Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim')
    let pe42Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim')
    if (!Number.isNaN(reinPrim)) {
      pe63 = parseInt(pe63)
      pe63Obje = parseInt(pe63Obje)
      pe63Prim = parseInt(pe63Prim)
      pe63Segu = parseInt(pe63Segu)
      reinObje = parseInt(reinObje)
      reinPrim = parseInt(reinPrim)
      reinSegu = parseInt(reinSegu)
      pediIncoObje = parseInt(pediIncoObje)
      pediIncoPrim = parseInt(pediIncoPrim)
      pediIncoSegu = parseInt(pediIncoSegu)
      let totaSali = 0
      let totaInco = 0
      let totaRein = 0
      if (selectedColumna.value === 2) {
        totaSali = pe63Segu
        totaInco = pediIncoSegu
        totaRein = reinSegu
      } else if (selectedColumna.value === 1) {
        totaSali = pe63Prim
        totaInco = pediIncoPrim
        totaRein = reinPrim
      } else {
        totaSali = pe63Obje
        totaInco = pediIncoObje
        totaRein = reinObje
      }
      if (pe63 > 0) {
        totaSali = pe63 - totaSali
      }
      if (totaSali < 0) {
        totaSali = 0
      }
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe21Prim = parseInt(pe21Prim)
      pe42Prim = parseInt(pe42Prim)
      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
          
      pediRetePrim = parseInt(pediRetePrim)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_prim', pediRetePrim)
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      refGridGlobal.value.setcellvalue(rowIndex, 'capi_obje', capiObje)
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_segu')
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_prim', pediTotaPrim)
      }
    }
  } else if (columnDataField === 'rein_segu') {
    let pe63 = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63')
    let pe63Prim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim')
    let pe63Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_segu')
    let pe63Obje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje')
    let reinObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje')
    let reinPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim')
    let reinSegu = parseInt(refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_segu'))
    let pediIncoObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje')
    let pediIncoPrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim')
    let pediIncoSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_segu')
    let consSeguObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_segu_obje')
    let consReteSegu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_rete_segu')
    let pe21Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_segu')
    let pe42Segu = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_segu')
    if (!Number.isNaN(reinSegu)) {
      pe63 = parseInt(pe63)
      pe63Obje = parseInt(pe63Obje)
      pe63Prim = parseInt(pe63Prim)
      pe63Segu = parseInt(pe63Segu)
      reinObje = parseInt(reinObje)
      reinPrim = parseInt(reinPrim)
      reinSegu = parseInt(reinSegu)
      pediIncoObje = parseInt(pediIncoObje)
      pediIncoPrim = parseInt(pediIncoPrim)
      pediIncoSegu = parseInt(pediIncoSegu)
      let totaSali = 0
      let totaInco = 0
      let totaRein = 0
      if (this.columna === '2') {
        totaSali = pe63Segu
        totaInco = pediIncoSegu
        totaRein = reinSegu
      } else if (this.columna === '1') {
        totaSali = pe63Prim
        totaInco = pediIncoPrim
        totaRein = reinPrim
      } else if (this.columna === '0') {
        totaSali = pe63Obje
        totaInco = pediIncoObje
        totaRein = reinObje
      }
      if (pe63 > 0) {
        totaSali = pe63 - totaSali
      }
      if (totaSali < 0) {
        totaSali = 0
      }
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe21Segu = parseInt(pe21Segu)
      pe42Segu = parseInt(pe42Segu)
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
          
      pediReteSegu = parseInt(pediReteSegu)
      refGridGlobal.value.setcellvalue(rowIndex, 'pedi_rete_segu', pediReteSegu)
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      refGridGlobal.value.setcellvalue(rowIndex, 'capi_repr', capiObje)
      let pediReteObje = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_obje')
      let pediRetePrim = refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_rete_prim')
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        refGridGlobal.value.setcellvalue(rowIndex, 'pedi_tota_segu', pediTotaSegu)
      }
    }
  }
}


onMounted(async () => {
  appStore.titulo(`Reportes / Proyeccion zona`)
  await obtenerCampana()
  await obtenerZona()

  await mostrarVariables(selectedVariable.value)
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

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zona')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/zonas`, {
      method: "get",
    })

    const itemZona = data.data_glob
    
    itemZona.forEach(element => 
      zonaOptions.value.push({
        id: element.codi_zona,
        text: element.codi_zona,
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
      lima: '',
      objetivoIncorporacion: '0',
      proyeccionIncorporacion: '0',
      reproyeccionIncorporacion: '0',
      objetivoRetencion: '0',
      proyeccionRetencion: '0',
      reproyeccionRetencion: '0',
      objetivoActividad: '0.00',
      proyeccionActividad: '0.00',
      reproyeccionActividad: '0.00',
    }
    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    sourceGlobal.value.localdata =  data.data_glob

    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    general.value = {
      lima: data.lima_prov,
      objetivoIncorporacion: data.obje_inco,
      proyeccionIncorporacion: data.obje_inco_proy,
      reproyeccionIncorporacion: data.obje_inco_repr,
      objetivoRetencion: data.obje_rete,
      proyeccionRetencion: data.obje_rete_proy,
      reproyeccionRetencion: data.obje_rete_repr,
      objetivoActividad: data.obje_acti,
      proyeccionActividad: data.obje_acti_proy,
      reproyeccionActividad: data.obje_acti_repr,
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
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
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
    zona: null,
  }
  general.value = {
    lima: '',
    objetivoIncorporacion: '0',
    proyeccionIncorporacion: '0',
    reproyeccionIncorporacion: '0',
    objetivoRetencion: '0',
    proyeccionRetencion: '0',
    reproyeccionRetencion: '0',
    objetivoActividad: '0.00',
    proyeccionActividad: '0.00',
    reproyeccionActividad: '0.00',
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona/excel`, {
      method: "post",
      body: {
        general: general.value,
        columna: selectedColumna.value,
        variable: selectedVariable.value,
        cabecera: cabecera.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onRegistrar = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene ninguna proyección por registrar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else if (selectedVariable.value !== 0) {
    appStore.mensajeSnackbar('Para registrar la proyección debe de estar marcada la variable "Todos".')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)

      const data  = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona`, {
        method: "post",
        body: {
          campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
          zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
          data: JSON.stringify(
            refGridGlobal.value.exportdata(
              'xml',
              null,
              false,
              null,
              true,
            ),
          ),
        },
      })
    
      appStore.mensajeSnackbar(`${data.message}`)
      appStore.color("success")
      appStore.snackbar(true)
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }
  }
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}

const columnsOcultarTodo = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_tota_prim',
  'pedi_tota_segu',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_inco_segu',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'pedi_rete_segu',
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
  'nive_lide',
]

const columnsMostrarTodo = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_tota_prim',
  'pedi_tota_segu',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_inco_segu',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'pedi_rete_segu',
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
  'nive_lide',
]

const columnsMostrarPedidosTotales = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_tota_prim',
  'pedi_tota_segu',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_inco_segu',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'pedi_rete_segu',
]

const columnsMostrarPedidosActividad = [
  'codi_sect',
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

const columnsMostrarPedidosRetencion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'pedi_rete_segu',
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
  'nive_lide',
]

const columnsMostrarCapitalizacion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_inco_segu',
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
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividad = [
  'codi_sect',
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

/*Proyeccion */
const columnsMostrarTodoProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_tota_prim',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'rein',
  'rein_obje',
  'rein_prim',
  'capi_obje',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'nive_lide',
]

const columnsMostrarPedidosTotalesProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_tota_prim',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pedi_rete_obje',
  'pedi_rete_prim',
]

const columnsMostrarPedidosActividadProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pegs',
  'pegs_obje',
  'pegs_prim',
]

const columnsMostrarPedidosRetencionProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_rete_obje',
  'pedi_rete_prim',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'rein',
  'rein_obje',
  'rein_prim',
  'nive_lide',
]

const columnsMostrarCapitalizacionProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_inco_obje',
  'pedi_inco_prim',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'rein',
  'rein_obje',
  'rein_prim',
  'capi_obje',
]

const columnsMostrarCobranzaProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividadProyeccion = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]

/*formula */
const columnsMostrarTodoFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_inco_obje',
  'pedi_rete_obje',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe42',
  'pe42_obje',
  'pe63',
  'pe63_obje',
  'pegs',
  'pegs_obje',
  'rein',
  'rein_obje',
  'capi_obje',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'nive_lide',
]

const columnsMostrarPedidosTotalesFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_obje',
  'pedi_inco_obje',
  'pedi_rete_obje',
]

const columnsMostrarPedidosActividadFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe42',
  'pe42_obje',
  'pe63',
  'pe63_obje',
  'pegs',
  'pegs_obje',
]

const columnsMostrarPedidosRetencionFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_rete_obje',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe42',
  'pe42_obje',
  'pe63',
  'pe63_obje',
  'pegs',
  'pegs_obje',
  'rein',
  'rein_obje',
  'nive_lide',
]

const columnsMostrarCapitalizacionFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'pedi_inco_obje',
  'pe63',
  'pe63_obje',
  'rein',
  'rein_obje',
  'capi_obje',
]

const columnsMostrarCobranzaFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividadFormula = [
  'codi_sect',
  'nomb_vend',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]

const mostrarVariables = async nuevaVariable => {
  refGridGlobal.value.beginupdate()

  columnsOcultarTodo.forEach(column => {
    refGridGlobal.value.hidecolumn(column)
  })

  if(selectedColumna.value >= 2){
    if (nuevaVariable === 0) {
      columnsMostrarTodo.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 1) {
      columnsMostrarPedidosTotales.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 2) {
      columnsMostrarPedidosActividad.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 3) {
      columnsMostrarPedidosRetencion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 4) {
      columnsMostrarCapitalizacion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 5) {
      columnsMostrarCobranza.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 6) {
      columnsMostrarConsecutividad.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  // eslint-disable-next-line sonarjs/no-duplicated-branches
  } else if(selectedColumna.value >= 1 ){
    if (nuevaVariable === 0) {
      columnsMostrarTodoProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 1) {
      columnsMostrarPedidosTotalesProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 2) {
      columnsMostrarPedidosActividadProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 3) {
      columnsMostrarPedidosRetencionProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 4) {
      columnsMostrarCapitalizacionProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 5) {
      columnsMostrarCobranzaProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 6) {
      columnsMostrarConsecutividadProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  // eslint-disable-next-line sonarjs/no-duplicated-branches
  } else {
    if (nuevaVariable === 0) {
      columnsMostrarTodoFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 1) {
      columnsMostrarPedidosTotalesFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 2) {
      columnsMostrarPedidosActividadFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 3) {
      columnsMostrarPedidosRetencionFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 4) {
      columnsMostrarCapitalizacionFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 5) {
      columnsMostrarCobranzaFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (nuevaVariable === 6) {
      columnsMostrarConsecutividadFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  }
  
  refGridGlobal.value.endupdate()
}

watch(selectedVariable, async (nuevaVariable, antiguaVariable) => {
  await mostrarVariables(nuevaVariable)
})

watch(selectedColumna, async (nuevaVariable, antiguaVariable) => {
  refGridGlobal.value.beginupdate()

  columnsOcultarTodo.forEach(column => {
    refGridGlobal.value.hidecolumn(column)
  })

  if(selectedColumna.value >= 2){
    if (selectedVariable.value === 0) {
      columnsMostrarTodo.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 1) {
      columnsMostrarPedidosTotales.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 2) {
      columnsMostrarPedidosActividad.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 3) {
      columnsMostrarPedidosRetencion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 4) {
      columnsMostrarCapitalizacion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 5) {
      columnsMostrarCobranza.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 6) {
      columnsMostrarConsecutividad.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  // eslint-disable-next-line sonarjs/no-duplicated-branches
  } else if(selectedColumna.value >= 1 ){
    if (selectedVariable.value === 0) {
      columnsMostrarTodoProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 1) {
      columnsMostrarPedidosTotalesProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 2) {
      columnsMostrarPedidosActividadProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 3) {
      columnsMostrarPedidosRetencionProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 4) {
      columnsMostrarCapitalizacionProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 5) {
      columnsMostrarCobranzaProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 6) {
      columnsMostrarConsecutividadProyeccion.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  // eslint-disable-next-line sonarjs/no-duplicated-branches
  } else {
    if (selectedVariable.value === 0) {
      columnsMostrarTodoFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 1) {
      columnsMostrarPedidosTotalesFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 2) {
      columnsMostrarPedidosActividadFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 3) {
      columnsMostrarPedidosRetencionFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 4) {
      columnsMostrarCapitalizacionFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 5) {
      columnsMostrarCobranzaFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    } else if (selectedVariable.value === 6) {
      columnsMostrarConsecutividadFormula.forEach(column => {
        refGridGlobal.value.showcolumn(column)
      })
    }
  }
  

  
  refGridGlobal.value.endupdate()
})
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <RegistrarBoton @procesar="onRegistrar" />
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
                      v-model="formulario.zona"
                      :items="zonaOptions"
                      label="Zona"
                      placeholder="Seleccionar zona"
                      item-title="text"
                      item-value="id"
                      :error="errorZona"
                      :error-messages="errorMensajeZona"
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
                        REPROYECCIÓN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lima - Provincia</td>
                      <td colspan="3">
                        {{ general.lima }}
                      </td>
                    </tr>
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.proyeccionIncorporacion }}</td>
                      <td>{{ general.reproyeccionIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.proyeccionRetencion }}</td>
                      <td>{{ general.reproyeccionRetencion }}</td>
                    </tr>
                    <tr>
                      <td>% Actividad</td>
                      <td>{{ general.objetivoActividad }}</td>
                      <td>{{ general.proyeccionActividad }}</td>
                      <td>{{ general.reproyeccionActividad }}</td>
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
            <VCard title="Columnas">
              <VCardText>
                <VRadioGroup
                  v-model="selectedColumna"
                  inline
                >
                  <div>
                    <VRadio
                      v-for="columna in columnas"
                      :key="columna.value"
                      :label="columna.title"
                      :value="columna.value"
                      color="secondary"
                    />
                  </div>
                </VRadioGroup>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <JqxGrid
                ref="refGridGlobal"
                theme="material"
                width="100%"
                :localization="localization"
                :height="450"
                :columns="colum"
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
                @cellendedit="onEditar($event)"
              />
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
