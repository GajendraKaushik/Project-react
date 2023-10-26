import React, { useState, useContext}from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { Authcontext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'


import './PlaceItem.css'


const PlaceItem = (props) => {
    
    const {isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(Authcontext)
    const [showMap , setshowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const openshowMapHandler =  () => setshowMap(true)
    const closeshowMapHandler = () =>  setshowMap(false)

    const showDeleteWarningHandler = () =>{
        setShowConfirmModal(true)
    };
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }
    const confirmDeleteHandler =  async () =>{
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:5100/api/places/${props.id}`,
                'DELETE'
            );
            props.onDelete(props.id)
        }catch (err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            <Modal 
            show = {showMap}
            onCancel = {closeshowMapHandler}
            header = {props.address}
            contentClass = "place-item__modal-content"
            footerClass ="place-item__modal-actions"
            footer = {<Button onClick={closeshowMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <Map canter ={props.coordinates} zoom ={16}/>
                </div>
            </Modal>
            <Modal 
                show = {showConfirmModal}
                onCancel = {cancelDeleteHandler}
                header = "Are you sure ?"
                footerClass ="place-item__modal-actions"
                footer ={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button> 
                    </React.Fragment>
                }
                >
                <p>
                    Do you want to proceed and delete this place ? Please note that it cant't be undone thereafter.
                </p>
            </Modal>

        <li className='place-item'>
            <Card className="place-item__content">
            <div className='place-item__image'>
               <img src = {props.image} alt={props.title} />
            </div>
            <div className='place-item__info'>
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className='place-item__actions'>
                <Button inverse onClick={openshowMapHandler}>VIEW ON MAP</Button>
                {auth.userId === props.creatorId &&
                 (<Button to = {`/places/${props.id}`}>EDIT</Button> 
                 )}

                {auth.userId === props.creatorId && 
                (<Button danger onClick = {showDeleteWarningHandler}>DELETE</Button>
                ) }     
            </div>
            </Card>
        </li>
        </React.Fragment>

    )
}

export default PlaceItem;