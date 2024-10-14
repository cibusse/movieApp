import { 
    IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, 
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, 
    IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, 
    IonTitle, IonToolbar, useIonViewWillEnter 
} from '@ionic/react';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { SearchResult } from '../hooks/useApi'; 

interface DetailsPageProps extends RouteComponentProps<{
    id: string;
}> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi();
    const [information, setInformation] = useState<SearchResult[]>([]);

    useIonViewWillEnter(() => {
        const fetchDetails = async () => {
            try {
                const id = match.params.id;
                if (id) {
                    const data = await getDetails(id);
                    console.log('Data from getDetails:', data); 
                    //setInformation(data); 
                } else {
                    console.error("No ID found in route params");
                }
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        };

        fetchDetails();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/movies"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent>
                {information.length > 0 && information.map((detail) => (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{detail.Title}</IonCardTitle>
                            <IonCardSubtitle>{detail.Year}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonImg src={detail.Poster} />
                            <IonItem lines="none">
                                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                                <IonLabel>{detail.imdbRating}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal 
                    trigger="open-modal" 
                    initialBreakpoint={0.25} 
                    breakpoints={[0, 0.25, 0.5, 0.75]}
                >
                    <IonContent className="ion-padding">
                        {information.length > 0 && (
                            <>
                                <IonItem lines="none">
                                    <IonIcon icon={clipboardOutline} slot="start" />
                                    <IonLabel>{information[0].Director}</IonLabel> 
                                </IonItem>
                                <IonItem lines="none">
                                    <IonIcon icon={bodyOutline} slot="start" />
                                    <IonLabel className="ion-text-wrap">{information[0].Actors}</IonLabel> 
                                </IonItem>
                                <IonItem lines="none">
                                    <IonIcon icon={trophyOutline} slot="start" />
                                    <IonLabel className="ion-text-wrap">{information[0].Awards}</IonLabel>
                                </IonItem>
                                <p className="ion-padding">{information[0].Plot}</p>
                            </>
                        )}
                    </IonContent>
                </IonModal>

                <IonContent className="ion-padding"></IonContent>
            </IonContent>

            <IonFooter>
                <IonButton expand="full" id="open-modal">
                    Show more
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Details;
