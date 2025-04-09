<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
import { computed, ref } from 'vue';

definePage({
  meta: {
    action: 'colombia/repo_come_cons_ases_nuev',
    subject: 'colombia/repo_come_cons_ases_nuev',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const items = ref([])
const itemsInicialDetalle = ref([])
const busqueda =  ref({})
const refGridGlobal=ref()
const refGridDeta=ref()
const camp_label=ref({})

const itemsdeta = computed(() => {
  if(busqueda.value) {
    return itemsInicialDetalle.value.filter(item => {
      return Object.entries(busqueda.value).every(([key, value]) => {
        if (value.substring(0, 1) === "=") {
          let el = value.split("=")
          
          return (item[key] || "").toString().toUpperCase() === el[1].toString().toUpperCase()
        }
        if (value.substring(0, 1) === ">") {
          let el = value.split(">")
          if (item[key] !== " ") {
            return Number(item[key] || "") > el[1]
          }
        }

        return (item[key] || "").toString().toUpperCase() === el[1].toString().toUpperCase()
      })
    })
  } else {
    return itemsInicialDetalle.value
  }
})

const onSeleccionar = (columna, item) => {
  switch (columna) {
  case 'codi_camp_1':
    busqueda.value = {
      'codi_sect': `=${item.codi_sect}`,
      'codi_camp_1': '>0',
    }
    break
  case 'codi_camp_2':
    busqueda.value = {
      'codi_sect': `=${item.codi_sect}`,
      'codi_camp_1': '>0',
      'codi_camp_2': '>0',
    }
    break
  case 'codi_camp_3':
    busqueda.value = {
      'codi_sect': `=${item.codi_sect}`,
      'codi_camp_1': '>0',
      'codi_camp_2': '>0',
      'codi_camp_3': '>0',
    }
    break
  case 'codi_camp_4':
    busqueda.value = {
      'codi_sect': `=${item.codi_sect}`,
      'codi_camp_1': '>0',
      'codi_camp_2': '>0',
      'codi_camp_3': '>0',
      'codi_camp_4': '>0',
    }
    break
  default:
    break
  }
}

const formulario = ref({
  campana: null,
  zona: null,
})


const headers = ref(computed(() => {
  return [
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Corte',
      dataField: 'codi_cort',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'C.C Lider',
      dataField: 'codi_sect',
      width: '200',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nombre Lider',
      dataField: 'nomb_terc',
      width: '200',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: camp_label?.value?.camp1 ? camp_label.value.camp1 : '0',
      dataField: 'codi_camp_1',
      width: '90',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    },
    {
      text: camp_label?.value?.camp1 ? `% ${camp_label.value.camp1}` : '% 0',
      dataField: 'porc_codi_camp_1',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp2 ? camp_label.value.camp2 : '0',
      dataField: 'codi_camp_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp2 ? `% ${camp_label.value.camp2}` : '% 0',
      dataField: 'porc_codi_camp_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp3 ? camp_label.value.camp3:'0',
      dataField: 'codi_camp_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp3 ? `% ${camp_label.value.camp3}`: '% 0',
      dataField: 'porc_codi_camp_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp4 ? camp_label.value.camp4:'0',
      dataField: 'codi_camp_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp4 ? `% ${camp_label.value.camp4}`: '% 0',
      dataField: 'porc_codi_camp_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
}))

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'codi_camp_1', type: 'integer' },
    { name: 'porc_codi_camp_1', type: 'string' },
    { name: 'codi_camp_2', type: 'string' },
    { name: 'porc_codi_camp_2', type: 'string' },
    { name: 'codi_camp_3', type: 'string' },
    { name: 'porc_codi_camp_3', type: 'string' },
    { name: 'codi_camp_4', type: 'string' },
    { name: 'porc_codi_camp_4', type: 'string' },
  ],
  datatype: 'json',
})


const headersdeta = ref(computed(() => {
  return [
    // {
    //   text: 'Camp. Ingr',
    //   dataField: 'camp_ingr',
    //   width: '120',
    //   align: 'center',
    //   cellsalign: 'center',
    //   hidden: true, // esta oculta la columna
    // },
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Corte',
      dataField: 'codi_cort',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    // {
    //   text: 'Sector',
    //   dataField: 'codi_sect',
    //   width: '90',
    //   align: 'center',
    //   cellsalign: 'center',
    //   filtertype: 'checkedlist',
    //   pinned: true,
    //   hidden: true
    // },
    {
      text: 'Código',
      dataField: 'codi_terc',
      width: '120',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    },
    {
      text: 'Nro ident.',
      dataField: 'nume_iden',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      pinned: true
    },
    {
      text: 'Nombre(s) y Apellido(s)',
      dataField: 'nomb_clie',
      width: '300',
      align: 'center',
      cellsalign: 'center',
      pinned: true
    },
    
    {
      text: 'Teléfono',
      dataField: 'tele_terc',
      width: '210',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Saldo',
      dataField: 'sald_docu',
      width: '120',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp1 ? camp_label.value.camp1 : '0',
      dataField: 'codi_camp_1',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp1 ? `${camp_label.value.camp1} Zona` :'0 Zona',
      dataField: 'codi_zona_1',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    // {
    //   text: camp_label?.value?.camp1 ? `${camp_label.value.camp1} Sector` :'0 Sector',
    //   dataField: 'codi_sect_1',
    //   width: '90',
    //   align: 'center',
    //   cellsalign: 'center',
    // },
    {
      text: camp_label?.value?.camp1 ? `${camp_label.value.camp1} Fact` :'0 Fact',
      dataField: 'tota_fact_1',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text:  camp_label?.value?.camp2 ? camp_label.value.camp2 :'0 ',
      dataField: 'codi_camp_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp2 ? `${camp_label.value.camp2} Zona` :'0 Zona',
      dataField: 'codi_zona_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    // {
    //   text: camp_label?.value?.camp2 ? `${camp_label.value.camp2} Sector` :'0 Sector',
    //   dataField: 'codi_sect_2',
    //   width: '90',
    //   align: 'center',
    //   cellsalign: 'center',
    // },
    {
      text: camp_label?.value?.camp2 ? `${camp_label.value.camp2} Fact` :'0 Fact',
      dataField: 'tota_fact_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp3 ? camp_label.value.camp3:'0 ',
      dataField: 'codi_camp_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp3 ? `${camp_label.value.camp3} Zona` :'0 Zona',
      dataField: 'codi_zona_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    // {
    //   text: camp_label?.value?.camp3 ? `${camp_label.value.camp3} Sector` :'0 Sector',
    //   dataField: 'codi_sect_3',
    //   width: '90',
    //   align: 'center',
    //   cellsalign: 'center',
    // },
    {
      text: camp_label?.value?.camp3 ? `${camp_label.value.camp3} Fact` :'0 Fact',
      dataField: 'tota_fact_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp4 ? camp_label.value.camp4:'0 ',
      dataField: 'codi_camp_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: camp_label?.value?.camp4 ? `${camp_label.value.camp4} Zona` :'0 Zona',
      dataField: 'codi_zona_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    // {
    //   text: camp_label?.value?.camp4 ? `${camp_label.value.camp4} Sector` :'0 Sector',
    //   dataField: 'codi_sect_4',
    //   width: '90',
    //   align: 'center',
    //   cellsalign: 'center',
    // },
    {
      text:  camp_label?.value?.camp4 ? `${camp_label.value.camp4} Fact` :'0 Fact',
      dataField: 'tota_fact_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
}))

const sourceDeta = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'codi_terc', type: 'integer' },
    { name: 'codi_terc', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'nomb_clie', type: 'string' },
    { name: 'camp_ingr', type: 'string' },
    { name: 'tele_terc', type: 'string' },
    { name: 'sald_docu', type: 'string' },
    { name: 'codi_camp_1', type: 'string' },
    { name: 'codi_zona_1', type: 'string' },
    { name: 'codi_sect_1', type: 'string' },
    { name: 'tota_fact_1', type: 'string' },
    { name: 'codi_camp_2', type: 'string' },
    { name: 'codi_zona_2', type: 'string' },
    { name: 'codi_sect_2', type: 'string' },
    { name: 'tota_fact_2', type: 'string' },
    { name: 'codi_camp_3', type: 'string' },
    { name: 'codi_zona_3', type: 'string' },
    { name: 'codi_sect_3', type: 'string' },
    { name: 'tota_fact_3', type: 'string' },
    { name: 'codi_camp_4', type: 'string' },
    { name: 'codi_zona_4', type: 'string' },
    { name: 'codi_sect_4', type: 'string' },
    { name: 'tota_fact_4', type: 'string' },
  ],
  datatype: 'json',
})


const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const adaptadordeta = new jqx.dataAdapter(sourceDeta.value)
const localization =  {
    filterselectstring: ' ',
};

const localizationdeta =  {
    filterselectstring: ' ',
};
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Consecutividad De Nuevas Asesoras`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 80)
    
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
    onLimpiar()
    limpiarValidacion()

    const { data } = await $api(`/api/sami/v1/reportes/consecutividad-asesora`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })
  
    items.value = data.data_glob
    itemsInicialDetalle.value = data.data_deta
    sourceGlobal.value.localdata = data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    sourceDeta.value.localdata = data.data_deta
    refGridDeta.value.updatebounddata('cells')
    refGridDeta.value.refreshfilterrow()
    /**
     * @type {{[key: string]: string}}
     * actualiza el objeto de datos para que se reflejen los cambios en el grid en las columnas
     */
    camp_label.value = {camp1: data.codi_camp_1
      ,camp2: data.codi_camp_2
      ,camp3: data.codi_camp_3
      ,camp4: data.codi_camp_4
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

const actualizarHeaders = datos => {
  console.log(datos)
  console.log(headers)
  headers.value[5].text = datos.camp_1
  // headers.value = [
  //   { dataField: 'codi_area',        text: 'Región' },
  //   { dataField: 'codi_cort',        text: 'Corte' },
  //   { dataField: 'codi_zona',        text: 'Zona' },
  //   { dataField: 'codi_sect',        text: 'Sector' },
  //   { dataField: 'codi_camp_1',      text: datos.camp_1 },
  //   { dataField: 'porc_codi_camp_1', text: `% ${datos.camp_1}` },
  //   { dataField: 'codi_camp_2',      text: datos.camp_2 },
  //   { dataField: 'porc_codi_camp_2', text: `% ${datos.camp_2 }` },
  //   { dataField: 'codi_camp_3',      text: datos.camp_3 },
  //   { dataField: 'porc_codi_camp_3', text: `% ${datos.camp_3 }` },
  //   { dataField: 'codi_camp_4',      text: datos.camp_4 },
  //   { dataField: 'porc_codi_camp_4', text: `% ${datos.camp_4 }` },
  // ]

}

const actualizarHeadersDeta = datos => {
  headersdeta.value = [
    { dataField: 'codi_area',   text: 'Región' },
    { dataField: 'codi_cort',   text: 'Corte' },
    { dataField: 'codi_zona',   text: 'Zona' },
    { dataField: 'codi_sect',   text: 'Sector' },
    { dataField: 'codi_terc',   text: 'Código' },
    { dataField: 'nume_iden',   text: 'Nro ident.' },
    { dataField: 'nomb_clie',   text: 'Nombre(s) y Apellido(s)' },
    { dataField: 'camp_ingr',   text: 'Camp. Ingr' },
    { dataField: 'tele_terc',   text: 'Teléfono' },
    { dataField: 'sald_docu',   text: 'Saldo' },
    { dataField: 'codi_camp_1', text: datos.camp_1 },
    { dataField: 'codi_zona_1', text: `${datos.camp_1} Zona` },
    { dataField: 'codi_sect_1', text: `${datos.camp_1} Sect` },
    { dataField: 'tota_fact_1', text: `${datos.camp_1} Fact` },
    { dataField: 'codi_camp_2', text: datos.camp_2 },
    { dataField: 'codi_zona_2', text: `${datos.camp_2} Zona` },
    { dataField: 'codi_sect_2', text: `${datos.camp_2} Sect` },
    { dataField: 'tota_fact_2', text: `${datos.camp_2} Fact` },
    { dataField: 'codi_camp_3', text: datos.camp_3 },
    { dataField: 'codi_zona_3', text: `${datos.camp_3} Zona` },
    { dataField: 'codi_sect_3', text: `${datos.camp_3} Sect` },
    { dataField: 'tota_fact_3', text: `${datos.camp_3} Fact` },
    { dataField: 'codi_camp_4', text: datos.camp_4 },
    { dataField: 'codi_zona_4', text: `${datos.camp_4} Zona` },
    { dataField: 'codi_sect_4', text: `${datos.camp_4} Sect` },
    { dataField: 'tota_fact_4', text: `${datos.camp_4} Fact` },
  ]
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/consecutividad-asesora/excel`, {
      method: "post",
      body: {
        cabeceraGlobal: headers.value,
        detalleGlobal: items.value,
        cabeceraDetalle: headersdeta.value,
        detalleDetalle: itemsdeta.value,
      },
    })
      
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  headers.value = [
    { key: 'codi_area',        title: 'Región' },
    { key: 'codi_cort',        title: 'Corte' },
    { key: 'codi_zona',        title: 'Zona' },
    { key: 'codi_sect',        title: 'Sector' },
    { key: 'codi_camp_1',      title: '0' },
    { key: 'porc_codi_camp_1', title: '% 0' },
    { key: 'codi_camp_2',      title: '0' },
    { key: 'porc_codi_camp_2', title: '% 0' },
    { key: 'codi_camp_3',      title: '0' },
    { key: 'porc_codi_camp_3', title: '% 0' },
    { key: 'codi_camp_4',      title: '0' },
    { key: 'porc_codi_camp_4', title: '% 0' },
  ]
  headersdeta.value = [
    { key: 'codi_area', title: 'Región' },
    { key: 'codi_cort', title: 'Corte' },
    { key: 'codi_zona', title: 'Zona' },
    { key: 'codi_sect', title: 'Sector' },
    { key: 'codi_terc', title: 'Código' },
    { key: 'nume_iden', title: 'Nro ident.' },
    { key: 'nomb_clie', title: 'Nombre(s) y Apellido(s)' },
    { key: 'camp_ingr', title: 'Camp. Ingr' },
    { key: 'tele_terc', title: 'Teléfono' },
    { key: 'sald_docu', title: 'Saldo' },
    { key: 'codi_camp_1', title: '0' },
    { key: 'codi_zona_1', title: '0 Zona' },
    { key: 'codi_sect_1', title: '0 Sect' },
    { key: 'tota_fact_1', title: '0 Fact' },
    { key: 'codi_camp_2', title: '0' },
    { key: 'codi_zona_2', title: '0 Zona' },
    { key: 'codi_sect_2', title: '0 Sect' },
    { key: 'tota_fact_2', title: '0 Fact' },
    { key: 'codi_camp_3', title: '0' },
    { key: 'codi_zona_3', title: '0 Zona' },
    { key: 'codi_sect_3', title: '0 Sect' },
    { key: 'tota_fact_3', title: '0 Fact' },
    { key: 'codi_camp_4', title: '0' },
    { key: 'codi_zona_4', title: '0 Zona' },
    { key: 'codi_sect_4', title: '0 Sect' },
    { key: 'tota_fact_4', title: '0 Fact' },
  ]
  items.value = []
  itemsdeta.value = []
  itemsInicialDetalle.value = []
  busqueda.value = {}
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false 
  errorMensajeZona.value = ''
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
            <VCard title="Buscar consecutividad">
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
            <VCard>
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headers"
                  :source="adaptadorGlobal"
                  :localization="localization"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  :editable="false"
                  />
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <JqxGrid
                  ref="refGridDeta"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersdeta"
                  :source="adaptadordeta"
                  :localization="localizationdeta"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  :editable="false"
                  />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
