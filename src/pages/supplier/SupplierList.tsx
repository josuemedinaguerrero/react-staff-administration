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
import { Supplier } from "./Supplier";
import { removeSuppier, searchSupplier } from "./SupplierApi";

const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [proveedores, setProveedores] = useState<Supplier[]>([]);

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let example = await searchSupplier();
    setProveedores(example);
  };

  const remove = (id: string) => {
    removeSuppier(id);
    search();
  };

  const addSupplier = () => {
    history.push("/page/supplier/new");
  };

  const editSupplier = (id: string) => {
    history.push("/page/supplier/" + id);
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
            <IonTitle>Gestión de proveedores</IonTitle>
            <IonItem>
              <IonButton onClick={addSupplier} color="primary" fill="outline" slot="end">
                <IonIcon icon={add} /> Agregar proveedor
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Teléfono</IonCol>
                <IonCol>Web</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {proveedores.map((proveedor) => (
                <IonRow key={proveedor.id}>
                  <IonCol>{proveedor.name}</IonCol>
                  <IonCol>{proveedor.email}</IonCol>
                  <IonCol>{proveedor.phone}</IonCol>
                  <IonCol>{proveedor.web}</IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => editSupplier(String(proveedor.id))}
                      color="primary"
                      fill="clear"
                    >
                      <IonIcon icon={pencil} />
                    </IonButton>
                    <IonButton onClick={() => remove(String(proveedor.id))} color="danger" fill="clear">
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

export default SupplierList;
