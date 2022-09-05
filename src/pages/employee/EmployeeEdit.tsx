import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Employee } from "./Employee";
import { saveEmployee, searchEmployeeById } from "./EmployeeApi";

const EmployeeEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== "new") {
      const result = await searchEmployeeById(id);
      if (result) setEmployee(result);
    }
  };

  const save = () => {
    saveEmployee(employee);
    history.push("/page/employees");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonTitle>Gestión de empleados: {id === "new" ? "Agregar Empleado" : "Editar Empleado"}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.firstname = String(e.detail.value))}
                    value={employee.firstname}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.lastname = String(e.detail.value))}
                    value={employee.lastname}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.email = String(e.detail.value))}
                    value={employee.email}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.address = String(e.detail.value))}
                    value={employee.address}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Teléfono</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.phone = String(e.detail.value))}
                    value={employee.phone}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Salario</IonLabel>
                  <IonInput
                    onIonChange={(e) => (employee.salary = Number(e.detail.value))}
                    value={employee.salary}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonItem>
              <IonButton onClick={save} color="success" fill="outline" slot="end">
                <IonIcon icon={checkmark} /> Guardar
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;
