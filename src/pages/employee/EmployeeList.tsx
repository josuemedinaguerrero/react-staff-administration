import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Employee } from "./Employee";
import { removeEmployee, searchEmployees } from "./EmployeeApi";

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [clientes, setClientes] = useState<Employee[]>([]);

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let example = await searchEmployees();
    setClientes(example);
  };

  const remove = (id: string) => {
    removeEmployee(id);
    search();
  };

  const addEmployee = () => {
    history.push("/page/employee/new");
  };

  const editEmployee = (id: string) => {
    history.push("/page/employee/" + id);
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
            <IonTitle>Gestión de empleados</IonTitle>
            <IonItem>
              <IonButton onClick={addEmployee} color="primary" fill="outline" slot="end">
                <IonIcon icon={add} /> Agregar empleado
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Teléfono</IonCol>
                <IonCol>Dirección</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {clientes.map((cliente) => (
                <IonRow key={cliente.id}>
                  <IonCol>
                    {cliente.firstname} {cliente.lastname}
                  </IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton onClick={() => editEmployee(String(cliente.id))} color="primary" fill="clear">
                      <IonIcon icon={pencil} />
                    </IonButton>
                    <IonButton onClick={() => remove(String(cliente.id))} color="danger" fill="clear">
                      <IonIcon icon={close} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
