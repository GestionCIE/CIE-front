import React from "react";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// function Formulario() {

//   return (
//     <React.Fragment>
//       <Form
//         {...layout}
//         form={form}
//         className="form"
//         name="control-hooks"
//         onFinish={onFinish}
//       >
//         <Form.Item
//           name="nombre"
//           label="Nombre"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="academico"
//           label="Prog. Acádemico"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="semestre"
//           label="Semestre actual"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="university"
//           label="Rel. Universidad"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Select
//             placeholder="Selecciona una opción"
//             /*  onChange={onUniversityChange} */
//             allowClear
//           >
//             <Option value="egresado">Egresado</Option>
//             <Option value="estudiante">Estudiante</Option>
//             <Option value="otro">Otro</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           noStyle
//           shouldUpdate={(prevValues, currentValues) =>
//             prevValues.university !== currentValues.university
//           }
//         >
//           {({ getFieldValue }) =>
//             getFieldValue("university") === "otro" ? (
//               <Form.Item
//                 name="customizeUniversity"
//                 label="Customize University"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             ) : null
//           }
//         </Form.Item>
//         <Form.Item
//           name="company"
//           label="Compañia"
//           rules={[
//             {
//               required: false,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="email"
//           label="E-mail"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="phone"
//           label="Telefono"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item {...tailLayout}>
//           <Button className="Form_button" type="primary" htmlType="submit">
//             Aceptar
//           </Button>
//           <Button className="Form_button" htmlType="button" onClick={onReset}>
//             Limpiar
//           </Button>
//         </Form.Item>
//       </Form>{" "}
//       <React.Fragment />
//     </React.Fragment>
//   );
// }

class Attendance extends React.Component {
  regster = () =>{
    console.log("register");
  }
  render(){
    return (
      <React.Fragment>
        <Form {...layout}  className="form" name="control-hooks" >
          <Form.Item name="nombre" label="Nombre"
           rules={[{ required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="academico" label="Prog. Acádemico"
            rules={[{ required: false,},]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="semestre" label="Semestre actual"
            rules={[{  required: false, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="university" label="Rel. Universidad"
            rules={[{ required: true, },]}>
            <Select placeholder="Selecciona una opción" allowClear>
              <Option value="egresado">Egresado</Option>
              <Option value="estudiante">Estudiante</Option>
              <Option value="otro">Otro</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.university !== currentValues.university }>
            {({ getFieldValue }) => getFieldValue("university") === "otro" ? (
                <Form.Item
                  name="customizeUniversity"
                  label="Customize University"
                  rules={[{ required: true,}, ]}>
                  <Input />
                </Form.Item>
                ) : null
            }
          </Form.Item>
          <Form.Item
            name="company" label="Compañia"
            rules={[{ required: false, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email" label="E-mail"
            rules={[{required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone" label="Telefono"
            rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button className="Form_button" type="primary" htmlType="submit" onClick={this.regster}>
              Aceptar
            </Button>
          </Form.Item>
        </Form>{" "}
        <React.Fragment />
      </React.Fragment>
    );
  }
}


export default Attendance;
