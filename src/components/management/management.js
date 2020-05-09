import React, { Component } from "react";
import { Table, Tabs } from "antd";
const columns = [
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
    width: 300,
    /*     fixed: "left", */
    render: (description) => (
      <span>
        {description.map((desc) => {
          let colore = "grey";
          let n = desc.includes("Actividad");
          if (n === true) {
            colore = 800;
          }
          return (
            <span style={{ fontWeight: colore }} key={desc}>
              {desc}
            </span>
          );
        })}
      </span>
    ),
  },
  {
    title: "Horas",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Valor/H",
    dataIndex: "valuehs",
    key: "valuehs",
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Semana 1",
    dataIndex: "sem1",
    key: "sem1",
  },
  {
    title: "Semana 2",
    dataIndex: "sem2",
    key: "sem2",
  },
  {
    title: "Semana 3",
    dataIndex: "sem3",
    key: "sem3",
  },
  {
    title: "Semana 4",
    dataIndex: "sem4",
    key: "sem4",
  },
  {
    title: "Semana 5",
    dataIndex: "sem5",
    key: "sem5",
  },
  {
    title: "Responsables",
    dataIndex: "resp",
    key: "resp",
  },
];
const f1 = [
  {
    key: "1",
    description: ["Actividad 1 - Evaluación de la organización"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "2",
    description: [
      "Aplicación instrumento  para recopilar información  de la empresa",
    ],
    hours: 3,
    valuehs: "$50,000",
    value: "$150,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Carlos Fabregas",
  },
  {
    key: "3",
    description: ["Evaluación estado actual de la organización"],
    hours: 2,
    valuehs: "$50,000",
    value: "$100,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Carlos Fabregas",
  },
  {
    key: "4",
    description: ["Actividad 2 - Evaluación del Modelo de Negocios"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "4",
    description: ["Taller : Modelo de Negocios"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
  {
    key: "4",
    description: ["Análisis de aspectos a revisar por empresario"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
];
const f2 = [
  {
    key: "1",
    description: ["Actividad 1-  Diseño de la propuesta de valor"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "2",
    description: ["Taller:  validación  de necesidad y perfil del cliente"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ilma Bonilla",
  },
  {
    key: "3",
    description: [
      "Taller  :  plantear  los  productos/servicios  que  ayudarán  a solucionar  el  problema/necesidad  para  ese  segmento  de clientes.  ",
    ],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ilma Bonilla",
  },
  {
    key: "4",
    description: ["Actividad 2 - Validación de la propuesta de valor"],
    hours: "",
    valuehs: "",
    value: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    resp: "",
  },
  {
    key: "5",
    description: ["Taller:  Diseño de prototipo  a validar"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Equipo CEI",
  },
  {
    key: "6",
    description: ["Diseño de Herramientas para validación"],
    hours: 2,
    valuehs: "$70,000",
    value: "$140,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "London No. 1 Lake Park",
  },
  {
    key: "7",
    description: ["Análisis de validación."],
    hours: 2,
    valuehs: "$70,000",
    value: "$140,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "London No. 1 Lake Park",
  },
];
const f3 = [
  {
    key: "1",
    description: ["Taller: Definición de lineamientos estrategicos"],
    hours: 3,
    valuehs: "$70,000",
    value: "$210,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Yesid Ariza",
  },
  {
    key: "2",
    description: ["Análisis de Factores críticos de éxito"],
    hours: 3,
    valuehs: "$50,000",
    value: "$150,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Yesid Ariza",
  },
  {
    key: "2",
    description: ["Taller: Modelo de comunicación Intregradas del Marketing"],
    hours: 3,
    valuehs: "$60,000",
    value: "$180,000",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "Ivonne Alcendra",
  },
  {
    key: "2",
    description: [
      "Desarrollo  de  etrategias  de    comunicaciones  Integradas  del marketing",
    ],
    hours: "-",
    valuehs: "$ ",
    value: "$ ",
    sem1: "testing",
    sem2: "testing",
    sem3: "testing",
    sem4: "testing",
    sem5: "testing",
    resp: "-",
  },
];
const { TabPane } = Tabs;
class management extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Fase 1" key="1">
            <Table
              columns={columns}
              pagination={false}
              dataSource={f1}
              scroll={{ x: 1200 }}
            />
          </TabPane>
          <TabPane tab="Fase 2" key="2">
            <Table
              columns={columns}
              pagination={false}
              dataSource={f2}
              scroll={{ x: 1200 }}
            />
          </TabPane>
          <TabPane tab="Fase 3" key="3">
            <Table
              columns={columns}
              pagination={false}
              dataSource={f3}
              scroll={{ x: 1200 }}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default management;
