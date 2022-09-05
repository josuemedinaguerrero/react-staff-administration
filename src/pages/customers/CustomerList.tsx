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
import { Customer } from "./Customer";
import { removeCustomer, searchCustomers } from "./CustomerApi";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [clientes, setClientes] = useState<Customer[]>([]);

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let data = await searchCustomers();
    setClientes(data);
  };

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  };

  const addCustomer = () => {
    history.push("/page/customer/new");
  };

  const editCustomer = (id: string) => {
    history.push("/page/customer/" + id);
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
            <IonTitle>Gestión de clientes</IonTitle>
            <IonItem>
              <IonButton onClick={addCustomer} color="primary" fill="outline" slot="end">
                <IonIcon icon={add} /> Agregar cliente
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
                    <IonButton onClick={() => editCustomer(String(cliente.id))} color="primary" fill="clear">
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

export default CustomerList;
