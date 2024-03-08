<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_proy_camp',
    subject: 'peru/repo_come_proy_camp',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

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

const headers = computed(() => {
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
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Proyeccion zona`)
  await obtenerCampana()
  await obtenerZona()
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
      console.log(e.response.data)
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
      query: {
        codigo: userData.codi_perf,
      },
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
      console.log(e.response.data)
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

    items.value = data.data_glob

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
  items.value = []
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
        data: items.value,
        cabecera: headers.value,
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
  if(items.value.length == 0 ) {
    appStore.mensajeSnackbar('No tiene ninguna proyeccion para registrar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else if (selectedColumna.value !== 0) {
    appStore.mensajeSnackbar('Para registrar la proyección debe de estar marcada la columna "Todos".')
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

      const { data } = await $api( `/api/sami/v1/reportes/proyeccion-campana-zona`, {
        method: "post",
        body: {
          campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
          zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
          data: items.value,
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

const actualizarItem = (item, columna) => {
  const indexItem = items.value.indexOf(item)
  const data = items.value[indexItem]

  if(columna === 'pedi_inco_prim') {
    const pedidoIncorporacion = data.pedi_inco_prim
    const pedidoRetencion = data.pedi_rete_prim
    if (!Number.isNaN(pedidoIncorporacion) && pedidoIncorporacion !== '') {    
      data.pedi_tota_prim =  parseInt(pedidoIncorporacion) + parseInt(pedidoRetencion)
    }
  } else if (columna === 'pedi_inco_segu') {
    const pedidoIncorporacion = data.pedi_inco_segu
    const pedidoRetencion = data.pedi_rete_segu
    if (!Number.isNaN(pedidoIncorporacion) && pedidoIncorporacion !== '') {    
      data.pedi_tota_segu =  parseInt(pedidoIncorporacion) + parseInt(pedidoRetencion)
    }
  } else if (columna === 'acti_obje') {
    const actiObje = parseFloat(data.acti_obje).toFixed(2)
    const actiInic = data.acti_inic
    if (!Number.isNaN(actiObje)) {
      let actiObjePedi = 0
      if (actiInic !== '0' && actiObje !== '0') {
        actiObjePedi = (actiInic * actiObje) / 100
        actiObjePedi = parseFloat(actiObjePedi).toFixed(2)
        actiObjePedi = Math.ceil(actiObjePedi)
      }
      if (actiObje > 0) {
        data.nume_acti = 1
      } else {
        data.nume_acti = 0
      }
      data.acti_obje_pedi = actiObjePedi
    }
  } else if (columna === 'cons_rete_prim') {
    const consRetePrim = parseInt(data.cons_rete_prim)
    let consSeguObje = data.cons_segu_obje
    let pe21Prim = data.pe21_prim
    let pe42Prim =data.pe42_prim
    let pe63Prim = data.pe63_prim
    let reinPrim = data.rein_prim
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
      data.pedi_rete_prim = pediRetePrim
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
      actiPrim = parseInt(actiPrim)
      data.acti_prim = actiPrim
          
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          data.acti_nume_prim = 1
        } else {
          data.acti_nume_prim = 0
        }
        data.acti_porc_prim = actiPorcPrim
      }
      const pediIncoPrim = parseInt(data.pedi_inco_prim)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        data.pedi_tota_prim = pediTotaPrim
      }         
    }
  } else if (columna === 'cons_rete_segu') {
    const consReteSegu = parseInt(data.cons_rete_segu)
    let consSeguObje = data.cons_segu_obje
    let pe21Segu = data.pe21_segu
    let pe42Segu = data.pe42_segu
    let pe63Segu = data.pe63_segu
    let reinSegu = data.rein_segu
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
      data.pedi_rete_segu = pediReteSegu
      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
      actiSegu = parseInt(actiSegu)
      data.acti_segu = actiSegu
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
            
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          data.acti_nume_segu = 1
        } else {
          data.acti_nume_segu = 0
        }
        data.acti_porc_segu = actiPorcSegu
      }
      let pediReteObje = data.pedi_rete_obje
      let pediIncoSegu = data.pedi_inco_segu
      let pediRetePrim = data.pedi_rete_prim
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        data.pedi_tota_segu = pediTotaSegu
      }
    } 
  } else if (columna === 'pe21_prim') {
    const pe21Prim = parseInt(data.pe21_prim)
    let consSeguObje = data.cons_segu_obje
    let consRetePrim = data.cons_rete_prim
    let pe42Prim = data.pe42_prim
    let pe63Prim = data.pe63_prim
    let reinPrim = data.rein_prim
    if (!Number.isNaN(pe21Prim)) {
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe42Prim = parseInt(pe42Prim)
      pe63Prim = parseInt(pe63Prim)
      reinPrim = parseInt(reinPrim)

      const pegsPrim = pe63Prim + pe42Prim + pe21Prim

      data.pegs_prim = pegsPrim
      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
      
      pediRetePrim = parseInt(pediRetePrim)
      data.pedi_rete_prim = pediRetePrim
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
      
      actiPrim = parseInt(actiPrim)
      data.acti_prim = actiPrim
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          data.acti_nume_prim = 1
        } else {
          data.acti_nume_prim = 0
        }
        data.acti_porc_prim = actiPorcPrim
      }
      let pediReteObje = data.pedi_rete_obje
      let pediReteSegu = data.pedi_rete_segu
      let pediIncoPrim = data.pedi_inco_prim
      
      pediIncoPrim = parseInt(pediIncoPrim)
      
      pediReteObje = parseInt(pediReteObje)
      
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        
        pediTotaPrim = parseInt(pediTotaPrim)
        data.pedi_tota_prim = pediTotaPrim
      }
    }
  } else if (columna === 'pe21_segu') {
    
    const pe21Segu = parseInt(cellValue)
    let consSeguObje = data.cons_segu_obje
    let consReteSegu = data.cons_rete_segu
    let pe42Segu = data.pe42_segu
    let pe63Segu = data.pe63_segu
    let reinSegu = data.rein_segu
    if (!Number.isNaN(pe21Segu)) {
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe42Segu = parseInt(pe42Segu)
      pe63Segu = parseInt(pe63Segu)
      reinSegu = parseInt(reinSegu)

      const pegsSegu = pe63Segu + pe42Segu + pe21Segu
      
      data.pegs_segu = pegsSegu
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
      
      pediReteSegu = parseInt(pediReteSegu)
      data.pedi_rete_segu = pediReteSegu

      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
      
      actiSegu = parseInt(actiSegu)
      data.acti_segu = actiSegu
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          data.acti_nume_segu = 1
        } else {
          data.acti_nume_segu = 0
        }
        data.acti_porc_segu = actiPorcSegu
      }
      let pediReteObje = data.pedi_rete_obje
      let pediIncoSegu = data.pedi_inco_segu
      let pediRetePrim = data.pedi_rete_prim
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        data.pedi_tota_segu = pediTotaSegu
      }
    }
  } else if (columna === 'pe42_prim') {
        
    const pe42Prim = parseInt(data.pe42_prim)
    let consSeguObje = data.cons_segu_obje
    let consRetePrim = data.cons_rete_prim
    let pe21Prim = data.pe21_prim
    let pe63Prim = data.pe63_prim
    let reinPrim = data.rein_prim
    if (!Number.isNaN(pe42Prim)) {
      consSeguObje = parseInt(consSeguObje)
      consRetePrim = parseInt(consRetePrim)
      pe21Prim = parseInt(pe21Prim)
      pe63Prim = parseInt(pe63Prim)
      reinPrim = parseInt(reinPrim)

      const pegsPrim = pe63Prim + pe42Prim + pe21Prim

      data.pegs_prim = pegsPrim
      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
          
      pediRetePrim = parseInt(pediRetePrim)
      data.pedi_rete_prim = pediRetePrim
      let actiPrim = consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim
          
      actiPrim = parseInt(actiPrim)
      data.acti_prim = actiPrim
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          data.acti_nume_prim = 1
        } else {
          data.acti_nume_prim = 0
        }
        data.acti_porc_prim = actiPorcPrim
      }
      let pediReteObje = data.pedi_rete_obje
      let pediReteSegu = data.pedi_rete_segu
      let pediIncoPrim = data.pedi_inco_prim
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
            
        pediTotaPrim = parseInt(pediTotaPrim)
        data.pedi_tota_prim = pediTotaPrim
      }
    }
  } else if (columna === 'pe42_segu') {
        
    const pe42Segu = parseInt(data.pe42_segu)
    let consSeguObje = data.cons_segu_obje
    let consReteSegu = data.cons_rete_segu
    let pe21Segu = data.pe21_segu
    let pe63Segu = data.pe63_segu
    let reinSegu = data.rein_segu
    if (!Number.isNaN(pe42Segu)) {
      consSeguObje = parseInt(consSeguObje)
      consReteSegu = parseInt(consReteSegu)
      pe21Segu = parseInt(pe21Segu)
      pe63Segu = parseInt(pe63Segu)
      reinSegu = parseInt(reinSegu)

      const pegsSegu = pe63Segu + pe42Segu + pe21Segu

      data.pegs_segu = pegsSegu
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
          
      pediReteSegu = parseInt(pediReteSegu)
      data.pedi_rete_segu = pediReteSegu
      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
          
      actiSegu = parseInt(actiSegu)
      data.acti_segu = actiSegu
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          data.acti_nume_segu = 1
        } else {
          data.acti_nume_segu = 0
        }
        data.acti_porc_segu = actiPorcSegu
      }
      let pediReteObje = data.pedi_rete_obje
      let pediIncoSegu = data.pedi_inco_segu
      let pediRetePrim = data.pedi_rete_prim
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        data.pedi_tota_segu = pediTotaSegu
      }
    }
  } else if (columna === 'pe63_prim') {
    let pe63 = data.pe63
    let pe63Obje = data.pe63_obje
    let pe63Prim = parseInt(data.pe63_prim)
    let pe63Segu = data.pe63_segu
    let reinObje = data.rein_obje
    let reinPrim = data.rein_prim
    let reinSegu = data.rein_segu
    let pediIncoObje = data.pedi_inco_obje
    let pediIncoPrim = data.pedi_inco_prim
    let pediIncoSegu = data.pedi_inco_segu
    let consSeguObje = data.cons_segu_obje
    let consRetePrim = data.cons_rete_prim
    let pe21Prim = data.pe21_prim
    let pe42Prim = data.pe42_prim
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

      data.pegs_prim = pegsPrim

      let pediRetePrim = consRetePrim
            + consSeguObje
            + pe21Prim
            + pe42Prim
            + pe63Prim
            + reinPrim
          
      pediRetePrim = parseInt(pediRetePrim)
      data.pedi_rete_prim = pediRetePrim
          
      const actiPrim = parseInt(
        consRetePrim + consSeguObje + pe21Prim + pe42Prim + pe63Prim,
      )

      data.acti_prim = actiPrim
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiPrim)) {
        let actiPorcPrim = '0.00'
            
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiPrim !== '0') {
          actiPorcPrim = (actiPrim / actiInic) * 100
          actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        }
        actiPorcPrim = parseFloat(actiPorcPrim).toFixed(2)
        if (actiPorcPrim > 0) {
          data.acti_nume_prim = 1
        } else {
          data.acti_nume_prim = 0
        }
        data.acti_porc_prim = actiPorcPrim
      }
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      data.capi_obje = capiObje
      let pediReteObje = data.pedi_rete_obje
      let pediReteSegu = data.pedi_rete_segu
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        data.pedi_tota_prim = pediTotaPrim
      }
    }
  } else if (columna === 'pe63_segu') {
    let pe63 = data.pe63
    let pe63Prim = data.pe63_prim
    let pe63Segu = parseInt(data.pe63_segu)
    let pe63Obje = data.pe63_obje
    let reinObje = data.rein_obje
    let reinPrim = data.rein_prim
    let reinSegu = data.rein_segu
    let pediIncoObje = data.pedi_inco_obje
    let pediIncoPrim = data.pedi_inco_prim
    let pediIncoSegu = data.pedi_inco_segu
    let consSeguObje = data.cons_segu_obje
    let consReteSegu = data.cons_rete_segu
    let pe21Segu = data.pe21_segu
    let pe42Segu = data.pe42_segu
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

      data.pegs_segu = pegsSegu
      let pediReteSegu = consReteSegu
            + consSeguObje
            + pe21Segu
            + pe42Segu
            + pe63Segu
            + reinSegu
      pediReteSegu = parseInt(pediReteSegu)
      data.pedi_rete_segu = pediReteSegu
      let actiSegu = consReteSegu + consSeguObje + pe21Segu + pe42Segu + pe63Segu
          
      actiSegu = parseInt(actiSegu)
      data.acti_segu = actiSegu
      let actiInic = data.acti_inic
      if (!Number.isNaN(actiSegu)) {
        let actiPorcSegu = '0.00'
        actiInic = parseInt(actiInic)
        if (actiInic !== '0' && actiSegu !== '0') {
          actiPorcSegu = (actiSegu / actiInic) * 100
          actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        }
        actiPorcSegu = parseFloat(actiPorcSegu).toFixed(2)
        if (actiPorcSegu > 0) {
          data.acti_nume_segu = 1
        } else {
          data.acti_nume_segu = 0
        }
        data.acti_porc_segu = actiPorcSegu
      }
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
          
      capiObje = parseInt(capiObje)
      data.capi_repr = capiObje
      let pediReteObje = data.pedi_rete_obje
      let pediRetePrim = data.pedi_rete_prim
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        data.pedi_tota_segu = pediTotaSegu
      }
    }
  } else if (columna === 'rein_prim') {
    let pe63 = data.pe63
    let pe63Prim = data.pe63_prim
    let pe63Segu = data.pe63_segu
    let pe63Obje = data.pe63_obje
    let reinObje = data.rein_obje
    let reinPrim = parseInt(data.rein_prim)
    let reinSegu = data.rein_segu
    let pediIncoObje = data.pedi_inco_obje
    let pediIncoPrim = data.pedi_inco_prim
    let pediIncoSegu = data.pedi_inco_segu
    let consSeguObje = data.cons_segu_obje
    let consRetePrim = data.cons_rete_prim
    let pe21Prim = data.pe21_prim
    let pe42Prim = data.pe42_prim
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
      data.pedi_rete_prim = pediRetePrim
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      data.capi_obje = capiObje
      let pediReteObje = data.pedi_rete_obje
      let pediReteSegu = data.pedi_rete_segu
      pediIncoPrim = parseInt(pediIncoPrim)
      pediReteObje = parseInt(pediReteObje)
      pediReteSegu = parseInt(pediReteSegu)
      if (!Number.isNaN(pediRetePrim)) {
        let pediTotaPrim = pediIncoPrim + pediRetePrim
        pediTotaPrim = parseInt(pediTotaPrim)
        data.pedi_tota_prim = pediTotaPrim
      }
    }
  } else if (columna === 'rein_segu') {
    let pe63 = data.pe63
    let pe63Prim = data.pe63_prim
    let pe63Segu = data.pe63_segu
    let pe63Obje = data.pe63_obje
    let reinObje = data.rein_obje
    let reinPrim = data.rein_prim
    let reinSegu = parseInt(data.rein_segu)
    let pediIncoObje = data.pedi_inco_obje
    let pediIncoPrim = data.pedi_inco_prim
    let pediIncoSegu = data.pedi_inco_segu
    let consSeguObje = data.cons_segu_obje
    let consReteSegu = data.cons_rete_segu
    let pe21Segu = data.pe21_segu
    let pe42Segu = data.pe42_segu
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
      data.pedi_rete_segu =pediReteSegu
      totaSali = parseInt(totaSali)
      totaInco = parseInt(totaInco)
      totaRein = parseInt(totaRein)
      let capiObje = totaInco + totaRein - totaSali
      capiObje = parseInt(capiObje)
      data.capi_repr = capiObje
      let pediReteObje = data.pedi_rete_obje
      let pediRetePrim = data.pedi_rete_prim
      pediIncoSegu = parseInt(pediIncoSegu)
      pediRetePrim = parseInt(pediRetePrim)
      pediReteObje = parseInt(pediReteObje)
      if (!Number.isNaN(pediReteSegu)) {
        let pediTotaSegu = pediIncoSegu + pediReteSegu
        pediTotaSegu = parseInt(pediTotaSegu)
        data.pedi_tota_segu = pediTotaSegu
      }
    }
  }

  if(columna === 'pedi_inco_prim' || columna === 'pedi_inco_segu' ) {
    let totaSali = 0
    let totaInco = 0
    let totaRein = 0

    if (selectedColumna.value === 2) {
      totaSali = parseInt(data.pe63_segu)
      totaInco = parseInt(data.pedi_inco_segu)
      totaRein = parseInt(data.rein_segu)
    } else if (selectedColumna.value  === 1) {
      totaSali = parseInt(data.pe63_prim)
      totaInco = parseInt(data.pedi_inco_prim)
      totaRein = parseInt(data.rein_prim)
    } else {
      totaSali = parseInt(data.pe63_obje)
      totaInco = parseInt(data.pedi_inco_obje)
      totaRein = parseInt(data.rein_obje)
    }

    if (data.pe63 > 0) {
      totaSali = data.pe63 - totaSali
    }

    if (totaSali < 0) {
      totaSali = 0
    }
    totaSali = parseInt(totaSali)
    totaInco = parseInt(totaInco)
    totaRein = parseInt(totaRein)
    data.capi_obje = parseInt(totaInco + totaRein - totaSali)
  }

  if(columna === 'pedi_inco_prim' || columna === 'pedi_inco_segu' || columna === 'cons_rete_prim' || columna === 'cons_rete_segu' || columna === 'pe21_prim' || columna === 'pe21_segu' || columna === 'pe42_prim' || columna === 'pe42_segu' || columna === 'pe63_prim' || columna === 'pe63_segu' || columna === 'rein_prim' || columna === 'rein_segu') {
    let factRete = 0
    if (selectedColumna.value === 2) {
      if (parseInt(data.pedi_rete_segu) > 0) {
        factRete = parseInt(data.pedi_rete_segu)
      } else if (parseInt(data.pedi_rete_prim) > 0) {
        factRete = parseInt(data.pedi_rete_prim)
      } else if (parseInt(data.pedi_rete_obje) > 0) {
        factRete = parseInt(data.pedi_rete_obje)
      }
    } else if (selectedColumna.value  === 1) {
      if (parseInt(data.pedi_rete_prim) > 0) {
        factRete = parseInt(data.pedi_rete_prim)
      } else if (parseInt(data.pedi_rete_obje) > 0) {
        factRete = parseInt(data.pedi_rete_obje)
      }
    } else {
      if (parseInt(data.pedi_rete_obje) > 0) {
        factRete = parseInt(data.pedi_rete_obje)
      }
    }
    factRete = parseInt(factRete)
    let niveLide = ''
    if (general.value.lima === 'Lima') {
      if (factRete < 11) {
        niveLide = 'Nivel 0'
      } else if (factRete >= 11 && factRete < 26) {
        niveLide = 'Nivel 1'
      } else if (factRete >= 26 && factRete < 36) {
        niveLide = 'Nivel 2'
      } else if (factRete >= 36 && factRete < 51) {
        niveLide = 'Nivel 3'
      } else if (factRete >= 51 && factRete < 71) {
        niveLide = 'Nivel 4'
      } else {
        niveLide = 'Nivel 5'
      }
    } else {
      if (factRete < 11) {
        niveLide = 'Nivel 0'
      } else if (factRete >= 11 && factRete < 26) {
        niveLide = 'Nivel 1'
      } else if (factRete >= 26 && factRete < 41) {
        niveLide = 'Nivel 2'
      } else if (factRete >= 41 && factRete < 61) {
        niveLide = 'Nivel 3'
      } else if (factRete >= 61 && factRete < 86) {
        niveLide = 'Nivel 4'
      } else {
        niveLide = 'Nivel 5'
      }
    }
    data.nive_lide = niveLide
  }
}
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
              <VDataTable
                :headers="headers"
                :items="items"
                :items-per-page="-1"
                class="text-no-wrap"
                no-data-text=""
                fixed-header="true"
                height="400"
              > 
                <template #headers>
                  <tr>
                    <th rowspan="2">
                      CORTE
                    </th>
                    <th rowspan="2">
                      LIDER
                    </th>
                    <th rowspan="2">
                      ACT. INIC.
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '1' : (selectedColumna === 1) ? '2' : '3'"
                    >
                      PEDIDOS TOTALES
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '1' : (selectedColumna === 1) ? '2' : '3'"
                    >
                      INCORPORACIÓN
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '1' : (selectedColumna === 1) ? '2' : '3'"
                    >
                      PEDIDOS DE RETENCIÓN
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '3' : (selectedColumna === 1) ? '5' : '7'"
                    >
                      % ACTIVIDAD
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
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
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
                    >
                      Peg21 40%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
                    >
                      Peg42 30%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
                    >
                      Peg63 25%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
                    >
                      Suma Pegs 35%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '2' : (selectedColumna === 1) ? '3' : '4'"
                    >
                      Reingresos 10%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 4"
                      class="text-center"
                      :colspan="(selectedColumna === 0) ? '1' : (selectedColumna === 1) ? '1' : '2'"
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
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 3"
                      rowspan="2"
                    >
                      NIVEL LIDER OBJE. PROY
                    </th>
                  </tr>
                  <tr>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      OBJETIVO %
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      OBJE. PEDI.
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2) && selectedColumna>=1">
                      PROYECCIÓN (%)
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2) && selectedColumna>=2">
                      REPROYECCIÓN (%)
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      RETE. CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      1 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      2 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      3 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEG21
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEG42
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      PEG63
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEGS
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      POS. REIN.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      OBJE. FORM. ÉXITO
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4) && selectedColumna>=1">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 4) && selectedColumna>=0">
                      OBJ. PROYECCIÓN
                    </th>
                    <th v-if="(selectedVariable === 0 || selectedVariable === 4) && selectedColumna>=2">
                      REPROYECCIÓN
                    </th>
                  </tr>
                </template>
                <template #item.pedi_inco_prim="{ item }">
                  <AppTextField
                    v-model="item.pedi_inco_prim"
                    placeholder=""
                    :base-color="(parseInt(item.pedi_inco_obje) === 0)? 'undefined' : (parseInt(item.pedi_inco_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pedi_inco_prim) / parseInt(item.pedi_inco_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pedi_inco_prim) / parseInt(item.pedi_inco_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    flat
                    @update:model-value="actualizarItem(item, 'pedi_inco_prim')"
                  />
                </template>
                <template #item.pedi_inco_segu="{ item }">
                  <AppTextField
                    v-model="item.pedi_inco_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pedi_inco_obje) === 0)? 'undefined' : (parseInt(item.pedi_inco_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pedi_inco_segu) / parseInt(item.pedi_inco_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pedi_inco_segu) / parseInt(item.pedi_inco_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
               
                    @update:model-value="actualizarItem(item, 'pedi_inco_segu')"
                  />
                </template>
                <template #item.pedi_rete_prim="{ item }">
                  <div v-if="parseInt(item.pedi_rete_obje) === 0">
                    {{ item.pedi_rete_prim }}
                  </div>
                  <div v-else-if="parseInt(item.pedi_rete_prim) === 0">
                    {{ item.pedi_rete_prim }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pedi_rete_prim) / parseInt(item.pedi_rete_obje))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.pedi_rete_prim }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pedi_rete_prim) / parseInt(item.pedi_rete_obje))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.pedi_rete_prim }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.pedi_rete_prim }}
                  </VChip>
                </template>
                <template #item.pedi_rete_segu="{ item }">
                  <div v-if="parseInt(item.pedi_rete_obje) === 0">
                    {{ item.pedi_rete_segu }}
                  </div>
                  <div v-else-if="parseInt(item.pedi_rete_segu) === 0">
                    {{ item.pedi_rete_segu }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pedi_rete_prim) / parseInt(item.pedi_rete_obje))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.pedi_rete_segu }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pedi_rete_prim) / parseInt(item.pedi_rete_obje))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.pedi_rete_segu }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.pedi_rete_segu }}
                  </VChip>
                </template>
                <template #item.acti_obje="{ item }">
                  <AppTextField
                    v-model="item.acti_obje"
                    placeholder=""
                    flat
                    @update:model-value="actualizarItem(item, 'acti_obje')"
                  />
                </template>
                <template #item.acti_prim="{ item }">
                  <div v-if="parseInt(item.acti_obje_pedi) === 0">
                    {{ item.acti_prim }}
                  </div>
                  <div v-else-if="parseInt(item.acti_prim) === 0">
                    {{ item.acti_prim }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.acti_prim) / parseInt(item.acti_obje_pedi))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.acti_prim }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.acti_prim }}
                  </VChip>
                </template>
                <template #item.acti_segu="{ item }">
                  <div v-if="parseInt(item.acti_obje_pedi) === 0">
                    {{ item.acti_segu }}
                  </div>
                  <div v-else-if="parseInt(item.acti_segu) === 0">
                    {{ item.acti_segu }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.acti_segu) / parseInt(item.acti_obje_pedi))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.acti_segu }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.acti_segu }}
                  </VChip>
                </template>
                <template #item.cons_rete_prim="{ item }">
                  <AppTextField
                    v-model="item.cons_rete_prim"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.cons_rete_obje) === 0)? 'undefined' : (parseInt(item.cons_rete_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.cons_rete_prim) / parseInt(item.cons_rete_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.cons_rete_prim) / parseInt(item.cons_rete_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'cons_rete_prim')"
                  />
                </template>
                <template #item.cons_rete_segu="{ item }">
                  <AppTextField
                    v-model="item.cons_rete_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.cons_rete_obje) === 0)? 'undefined' : (parseInt(item.cons_rete_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.cons_rete_segu) / parseInt(item.cons_rete_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.cons_rete_segu) / parseInt(item.cons_rete_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'cons_rete_segu')"
                  />
                </template>
                <template #item.pe21_prim="{ item }">
                  <AppTextField
                    v-model="item.pe21_prim"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe21_obje) === 0)? 'undefined' : (parseInt(item.pe21_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe21_prim) / parseInt(item.pe21_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe21_prim) / parseInt(item.pe21_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe21_prim')"
                  />
                </template>
                <template #item.pe21_segu="{ item }">
                  <AppTextField
                    v-model="item.pe21_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe21_obje) === 0)? 'undefined' : (parseInt(item.pe21_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe21_segu) / parseInt(item.pe21_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe21_segu) / parseInt(item.pe21_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe21_segu')"
                  />
                </template>
                <template #item.pe42_prim="{ item }">
                  <AppTextField
                    v-model="item.pe42_prim"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe42_obje) === 0)? 'undefined' : (parseInt(item.pe42_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe42_prim) / parseInt(item.pe42_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe42_prim) / parseInt(item.pe42_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe42_prim')"
                  />
                </template>
                <template #item.pe42_segu="{ item }">
                  <AppTextField
                    v-model="item.pe42_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe42_obje) === 0)? 'undefined' : (parseInt(item.pe42_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe42_segu) / parseInt(item.pe42_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe42_segu) / parseInt(item.pe42_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe42_segu')"
                  />
                </template>
                <template #item.pe63_prim="{ item }">
                  <AppTextField
                    v-model="item.pe63_prim"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe63_obje) === 0)? 'undefined' : (parseInt(item.pe63_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe63_prim) / parseInt(item.pe63_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe63_prim) / parseInt(item.pe63_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe63_prim')"
                  />
                </template>
                <template #item.pe63_segu="{ item }">
                  <AppTextField
                    v-model="item.pe63_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.pe63_obje) === 0)? 'undefined' : (parseInt(item.pe63_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.pe63_segu) / parseInt(item.pe63_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.pe63_segu) / parseInt(item.pe63_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'pe63_segu')"
                  />
                </template>
                <template #item.pegs_prim="{ item }">
                  <div v-if="parseInt(item.pegs_obje) === 0">
                    {{ item.pegs_prim }}
                  </div>
                  <div v-else-if="parseInt(item.pegs_prim) === 0">
                    {{ item.pegs_prim }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pegs_prim) / parseInt(item.pegs_obje))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.pegs_prim }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pegs_prim) / parseInt(item.pegs_obje))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.pegs_prim }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.pegs_prim }}
                  </VChip>
                </template>
                <template #item.pegs_segu="{ item }">
                  <div v-if="parseInt(item.pegs_obje) === 0">
                    {{ item.pegs_segu }}
                  </div>
                  <div v-else-if="parseInt(item.pegs_segu) === 0">
                    {{ item.pegs_segu }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pegs_segu) / parseInt(item.pegs_obje))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.pegs_segu }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.pegs_segu) / parseInt(item.pegs_obje))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.pegs_segu }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.pegs_segu }}
                  </VChip>
                </template>
                <template #item.rein_prim="{ item }">
                  <AppTextField
                    v-model="item.rein_prim"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.rein_obje) === 0)? 'undefined' : (parseInt(item.rein_prim) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.rein_prim) / parseInt(item.rein_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.rein_prim) / parseInt(item.rein_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'rein_prim')"
                  />
                </template>
                <template #item.rein_segu="{ item }">
                  <AppTextField
                    v-model="item.rein_segu"
                    placeholder=""
                    flat
                    :base-color="(parseInt(item.rein_obje) === 0)? 'undefined' : (parseInt(item.rein_segu) === 0) ? 'undefined' : (parseFloat(100 * (parseInt(item.rein_segu) / parseInt(item.rein_obje))).toFixed(2) >= 100) ? 'success' : (parseFloat(100 * (parseInt(item.rein_segu) / parseInt(item.rein_obje))).toFixed(2) >= 80) ? 'secondary' : 'error'"
                    @update:model-value="actualizarItem(item, 'rein_segu')"
                  />
                </template>
                <template #bottom />
              </VDataTable>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
