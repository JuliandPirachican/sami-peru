<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';

 
 
definePage({
  meta: {
    action: 'colombia/repo_come_simu_cobr',
    subject: 'colombia/repo_come_simu_cobr',
  },
})
 

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore();
const refGridGlobal=ref()
const refGridDetalle=ref()
 
const formulario = ref({
  campana: null,
  zona: null,
  objetivo21: 88,
  objetivo31: 92,
})
 
const objetivo21Options = ref([])
const objetivo31Options = ref([])
 
const headersGlobal = computed(() => {
  return [
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Codigo Lider",
    dataField: "cons_lide",
    pinned:true,
    // cellclassname: 'text-white bg-primary-light',
  },
  {
    width: 250,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Nombre Lider",
    dataField: "nomb_terc",
    pinned:true,
    // cellclassname: 'text-white bg-primary-light',
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Valor",
    dataField: "valo_docu",
    pinned:true,
    // cellclassname: 'text-white bg-primary-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        // suma=Math.round(aggregates['sum'],2);
        return  (aggregates['sum']!=undefined) ?  'T:'+Math.round(aggregates['sum'],4):'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Obj. max. saldo 31d",
    dataField: "obje_31di",
    cellclassname: 'text-white bg-primary-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
 
    // cellsRenderer: (row, column, value) => {
    //     return `<div style="width:100%; heigth:100%; background-color: bone; color: #000; text-align: center;">${value}</div>`; // Cambia el color de fondo y el color del texto
    //   }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo 31 días",
    dataField: "sald_31di",
    cellclassname: 'text-white bg-error-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% 31 días",
    dataField: "porc_31di",
    cellclassname: 'text-white bg-error-light',
    aggregates: ['avg'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['avg']!=undefined) ?  'T:'+aggregates['avg']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo actual",
    dataField: "sald_actu",
    cellclassname: 'text-white bg-error-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Actual",
    dataField: "porc_actu",
    cellclassname: 'text-white bg-error-light',
    aggregates: ['avg'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['avg']!=undefined) ?  'T:'+aggregates['avg']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Simulador",
    dataField: "simu_31di",
    cellclassname: 'text-white bg-success-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Simulador",
    dataField: "porc_simu_31di",
    cellclassname: 'text-white bg-success-light',
    aggregates: ['avg'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['avg']!=undefined) ?  'T:'+aggregates['avg']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Falta cobrar 31d",
    dataField: "falt_cobr_31di",
    cellclassname: 'text-white bg-success-light',
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  }
]
});
 
const sourceGlobal = ref({
  localdata: [],
  datafields: [
    {
      type: "string",
      name: "cons_lide",
    },
    {
      type: "string",
      name: "nomb_terc",
    },
    {
      type: "string",
      name: "valo_docu",
    },
    {
      type: "string",
      name: "obje_31di",
    },
    {
      type: "string",
      name: "sald_31di",
    },
    {
      type: "string",
      name: "porc_31di",
    },
    {
      type: "string",
      name: "sald_actu",
    },
    {
      type: "string",
      name: "porc_actu",
    },
    {
      type: "string",
      name: "simu_31di",
    },
    {
      type: "string",
      name: "porc_simu_31di",
    },
    {
      type: "string",
      name: "falt_cobr_31di",
    },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};
 
const headersDetalle = computed(() => {
  return [
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Código",
      dataField: "codi_terc",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Nro ident.",
      dataField: "nume_iden",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Nombre(s) y apellido(s)",
      dataField: "nomb_terc",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Teléfono",
      dataField: "tele_terc",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Documento",
      dataField: "nume_docu",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Campaña",
      dataField: "codi_camp",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Valor",
      dataField: "valo_docu",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Valor facturado",
      dataField: "valo_fact",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Percepcion",
      dataField: "impu_perc",
      hidden: true,
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Saldo 31di",
      dataField: "sald_31di",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Saldo actual",
      dataField: "sald_actu",
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Simulador",
      dataField: "simu_31di",
      cellclassname: 'text-white bg-success-light',
      editable: true,
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "Simulador",
      dataField: "simu_31di_copi",
      cellclassname: 'text-white bg-success-light',
      hidden: true,
    },
    {
      width: 150,
      align: "center",
      cellsAlign: "center",
      filterType: "checkedlist",
      text: "consecutivo lider",
      dataField: "cons_lide",
      cellclassname: 'text-white bg-success-light',
      hidden: true,
    },
  ];
});
 
const sourceDetalle = ref({
  localdata: [],
  datafields: [
    {
      type: "string",
      name: "codi_terc",
    },
    {
      type: "string",
      name: "nume_iden",
    },
    {
      type: "string",
      name: "nomb_terc",
    },
    {
      type: "string",
      name: "tele_terc",
    },
    {
      type: "string",
      name: "nume_docu",
    },
    {
      type: "string",
      name: "codi_camp",
    },
    {
      type: "string",
      name: "valo_docu",
    },
    {
      type: "string",
      name: "valo_fact",
    },
    {
      type: "string",
      name: "impu_perc",
    },
    {
      type: "string",
      name: "sald_31di",
    },
    {
      type: "string",
      name: "sald_actu",
    },
    {
      type: "string",
      name: "simu_31di",
    },
    {
      type: "string",
      name: "simu_31di_copi",
    },
    {
      type: "string",
      name: "cons_lide",
    }
  ],
  datatype: 'json',
})
const adaptadorDetalle = new jqx.dataAdapter(sourceDetalle.value)
const localizationDetail =  {
    filterselectstring: ' ',
};
 
const itemsGlobal = ref([])
const itemsDetalle = ref([])
 
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')
 
const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
 
onMounted(async () => {
  appStore.titulo(`Reportes / Simulador cobranza`)
  await obtenerObjetivo()
  await obtenerCampana()
  await obtenerZona()
})
 
const obtenerObjetivo = async () => {
  for (let index = 70; index <= 100; index++) {
    objetivo21Options.value.push({
      id: index,
      text: index,
    })
    objetivo31Options.value.push({
      id: index,
      text: index,
    })
  }
}
 
const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)
 
    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "GET",
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
    limpiarValidacion()
 
    itemsGlobal.value = []
    itemsDetalle.value = []
 
    const { data } = await $api(`/api/sami/v1/reportes/saldo-cartera`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        objetivo21: formulario.value.objetivo21,
        objetivo31: formulario.value.objetivo31,
      },
    })
 
    itemsGlobal.value = data.global
    sourceGlobal.value.localdata = data.global
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
   
    itemsDetalle.value = data.detalle
    sourceDetalle.value.localdata = data.detalle
    refGridDetalle.value.updatebounddata('cells')
    refGridDetalle.value.refreshfilterrow()
   
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
    objetivo21: 88,
    objetivo31: 92,
  }
  itemsGlobal.value = []
  itemsDetalle.value = []
}
 
const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)
 
    const { data } = await $api(`/api/sami/v1/reportes/saldo-cartera/excel`, {
      method: "POST",
      body: {
        cabeceraGlobal: headersGlobal.value,
        dataGlobal: itemsGlobal.value,
        cabeceraDetalle: headersDetalle.value,
        dataDetalle: itemsDetalle.value,
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
  errorZona.value = false
  errorMensajeZona.value = ''
}
 
let valoDocu = 0
let saldDocu = 0
let saldo31DiasDetalle = 0
const onEditarInicio = event => {
  const { args } = event

  saldo31DiasDetalle = refGridDetalle.value.getcellvaluebyid(
    args.rowindex,
    'sald_31di',
  )
}

const onEditarFin = event => {
  const { args } = event
  const columnDataField = args.datafield
  const rowIndex = args.rowindex
  const cellValue = parseFloat(args.value).toFixed(2)
  const oldValue = parseFloat(args.oldvalue).toFixed(2)

  const cons_lide = refGridDetalle.value.getcellvaluebyid(
    rowIndex,
    'cons_lide',
  )

  let rowIndexGlobal = 0
  const cobrJson = sourceGlobal.value.localdata

  for (let a = 0; a < cobrJson.length; a++) {
    if (cobrJson[a].cons_lide === cons_lide) {
      rowIndexGlobal = a
    }
  }
  let newValue = oldValue - cellValue
  newValue =parseFloat(parseFloat(newValue).toFixed(2)); 
  if (columnDataField === 'simu_31di') {
    let simu31di = refGridGlobal.value.getcellvaluebyid(rowIndexGlobal,'simu_31di');
    let valoDocu = refGridGlobal.value.getcellvaluebyid(rowIndexGlobal,'valo_docu');
    let obje31di = refGridGlobal.value.getcellvaluebyid(rowIndexGlobal,'obje_31di');

    console.log(" simu31di=",simu31di," valoDocu=", valoDocu," obje31di=", obje31di ," newValue=", newValue);
    
    simu31di = parseFloat(parseFloat(simu31di).toFixed(2));
    console.log("simu31di menos newValue=",simu31di);
    simu31di -= newValue
    valoDocu = parseFloat(parseFloat(valoDocu).toFixed(2));
    console.log("resultado simu31di=",simu31di);

    let porcSimu31di = '0.00'
    if (valoDocu !== 0) {
      porcSimu31di = 100 - 100 * (parseFloat(simu31di) / parseFloat(valoDocu))
      porcSimu31di = parseFloat(porcSimu31di).toFixed(2)
    }
  
    obje31di = parseFloat(parseFloat(obje31di).toFixed(2));
    let faltCobr31di = obje31di - simu31di
    faltCobr31di = parseFloat(faltCobr31di).toFixed(2)
    faltCobr31di = (faltCobr31di >= 0) ? '0.00': faltCobr31di;

    /**
     * Actualizar valores globales
     */
    refGridGlobal.value.setcellvalue(rowIndexGlobal,'porc_simu_31di',porcSimu31di);
    refGridGlobal.value.setcellvalue(rowIndexGlobal,'falt_cobr_31di',faltCobr31di);
    refGridGlobal.value.setcellvalue(rowIndexGlobal,'simu_31di', simu31di);
  }
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
            <VCard title="Buscar saldo cartera">
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
            <VCard title="Lista cartera">
              <VCardText>
                <VRow justify="space-between">
                  <!-- <VCol
                    cols="12"
                    md="4"
                  >
                   <AppSelect
                      v-model="formulario.objetivo21"
                      :items="objetivo21Options"
                      label="Objetivo 21 días"
                      placeholder="Seleccionar objetivo"
                      item-title="text"
                      item-value="id"
                    />
                  </VCol> -->
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.objetivo31"
                      :items="objetivo31Options"
                      label="Objetivo 31 días"
                      placeholder="Seleccionar objetivo"
                      item-title="text"
                      item-value="id"
                    />
                  </VCol>
                </VRow>
              </VCardText>
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersGlobal"
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
                  showstatusbar
                  showaggregates
                  :columnsmenu="false"
                  :editable="false"
                  />
              </VCardText>
             
              <VCardText>
                <JqxGrid
                  ref="refGridDetalle"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersDetalle"
                  :source="adaptadorDetalle"
                  :localization="localizationDetail"
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
                  editable
                  editmode="click"
                  @cellbeginedit="onEditarInicio($event)"
                  @cellendedit="onEditarFin($event)"
                  />
                </VCardText>
                <!-- showstatusbar
                showaggregates -->
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
