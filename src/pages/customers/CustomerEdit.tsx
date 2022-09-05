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
import { Customer } from "./Customer";
import { saveCustomer, searchCustomerById } from "./CustomerApi";

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id !== "new") {
      const result = await searchCustomerById(id);
      if (result) setCustomer(result);
    }
  };

  const save = async () => {
    await saveCustomer(customer);
    history.push("/page/customers");
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
            <IonTitle>Gestión de clientes: {id === "new" ? "Agregar Cliente" : "Editar Cliente"}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) => (customer.firstname = String(e.detail.value))}
                    value={customer.firstname}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) => (customer.lastname = String(e.detail.value))}
                    value={customer.lastname}
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
                    onIonChange={(e) => (customer.email = String(e.detail.value))}
                    value={customer.email}
                  >
                    {" "}
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    onIonChange={(e) => (customer.address = String(e.detail.value))}
                    value={customer.address}
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
                    onIonChange={(e) => (customer.phone = String(e.detail.value))}
                    value={customer.phone}
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

export default CustomerEdit;
