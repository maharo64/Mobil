import React, { useState } from 'react';
import { IonButton,IonContent,IonMenuButton,IonButtons, IonHeader  ,IonAlert,IonRow , IonCol , IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, useIonToast } from '@ionic/react';
import axios from 'axios';
import lzString from 'lz-string';
import './Insert.css';

const InsertEnchere: React.FC = () =>{
    const[description, setDescription] = useState('');
    const[duree, setDuree] = useState('');
    const[produit, setProduit] = useState('');
    const[prix, setPrix] = useState('');
    const[toast]=useIonToast();
    const[categorie,setCategorie] = useState('');
    const[photo, setPhoto] = useState(Array<string | ArrayBuffer | null | undefined>);
    const [showAlert,setShowAlert] = useState(false);
    //const [imageData, setImageData] = useState(null);

    // const handleImageChange = (event: any) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //       const compressePhoto = lzString.compressToEncodedURIComponent(reader.result as string);
    //       setPhoto(compressePhoto);
    //     };
    //   };
    var tab_photos: Array<string | ArrayBuffer | null | undefined> = [];
    const WIDTH = 400
    const HEIGHT = 300
    function getRatio(width: number, height: number) {
        if (width > height) {
            return WIDTH / width;
        } else {
            return HEIGHT / height;
        }
    }

    function compressImage(image_file: any, img_url: any) {

        let image = document.createElement("img");
        image.src = img_url;
        console.log("SRC=" + img_url);


        image.onload = (e) => {
            let canvas = document.createElement("canvas");
            let ratio = getRatio(image.width, image.height);
            console.log(image_file);
            console.log("WIDTH=" + image.width + "\tHEIGHT=" + image.height);
            canvas.width = image.width * ratio;
            canvas.height = image.height * ratio;

            const context = canvas.getContext("2d");
            context?.drawImage(image, 0, 0, canvas.width, canvas.height);
            var mimeType = image_file.type
            let new_img_url = context?.canvas.toDataURL(mimeType, 100);

            let new_image: any = document.createElement("img");
            new_image.src = new_img_url;

            console.log("NEW URL=" + new_img_url);

            tab_photos.push(new_img_url);
            setPhoto(tab_photos);
        }
    }


    const handleFile = async (e: any) => {
        tab_photos = [];

        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(files[i].height);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64 = reader.result;
                compressImage(files[i], base64);
            };
        }
    }
   function addEnchere(){
    console.log({
        description: description,
        duree: duree,
        produit: produit,
        prix: prix,
        idUtilisateur: sessionStorage.getItem('idUtilisateur'),
        idCategorie: categorie,
        photo: photo

    })
    axios.post("http://localhost:8080/encheres",{
        description: description,
        duree: duree,
        produit: produit,
        prix: prix,
        idUtilisateur: sessionStorage.getItem('idUtilisateur'),
        idCategorie: categorie,
        photo: photo[0]

    }).then(response=> {
        console.log(response.data);
        if(response.data.message == null){
            alert('inserer');
        }else{
            toast({
                message:response.data.message,
                duration:200,
                position:'bottom'
            });
        }
    });
   };
   const categories = new Array();
   categories.push("Boisson");
   categories.push("Tennis");
   categories.push("SmartPhone");
   categories.push("Art");
   return(
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ajouter Enchere</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                </IonToolbar>
        </IonHeader>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position='floating'>Description</IonLabel>
                        <IonInput required type ="text" placeholder="description" value={description} onInput={(e:any)=>setDescription(e.target.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Duree</IonLabel>
                        <IonInput required type ="number" placeholder="duree" value={duree} onInput={(e:any)=>setDuree(e.target.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Produit</IonLabel>
                        <IonInput required type ="text" placeholder="produit" value={produit} onInput={(e:any)=>setProduit(e.target.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Prix</IonLabel>
                        <IonInput required type ="number" placeholder="prix" value={prix} onInput={(e:any)=>setPrix(e.target.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem fill="outline">              
                        <IonSelect interface='popover' placeholder='categorie' onIonChange={(e:any) => setCategorie(e.detail.value!)}>
                            {categories.map((liste,index) =>
                                <IonSelectOption key={index} value={index+1}>{liste}</IonSelectOption>
                            )}
                        </IonSelect>
                    </IonItem> 
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <p>Image </p>
                        <input type ="file"  onChange={handleFile} ></input>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonButton expand="block" color="primary" onClick={ () => addEnchere()}>Ajouter</IonButton>
                </IonCol>
            </IonRow> 
            <IonAlert
             isOpen={showAlert}
             
             header={'Succesful'}
             message={'Enchere insert'}
             buttons={['OK']}
            />
        </IonContent>
   )
};
export default InsertEnchere;