import React ,{ useState, useEffect, useRef, useCallback } from "react"
//import { useDispatch, useSelector } from "react-redux"

//import { postListing, redirected } from "../../actions/listingActions"
//import { resetErrors } from "../../actions/errorActions"

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const ListingForm = props => {
    //const errors = useSelector(state=>state.errors)

    //const dispatch = useDispatch()

    // adds effects to be called on form final unmount
  /*  useEffect(()=>{
        return () => {
            //dispatch(redirected())
          //  dispatch(resetErrors())
        }
    }, [dispatch])*/

    // sets state for blank listing
    const [location, setLocation] = useState({ lat: 51.501364, lng: -0.141890 })
    const [listing, setListing] = useState({
        name: "",
        description: "",
        image: {},
        latLng: location
    })

    // adds form change handling
    const handleChange = e => {
        setListing({...listing, [e.target.id]: e.target.value})
    }

    // adds form file upload handling
    const handleFileAddition = e => {
        setListing({...listing, image: e.target.files[0]})
    }

    // handles form submission
    const handleSubmit = e => {
        e.preventDefault()
      //  dispatch(postListing(listing))
    }

    // ------------------- Google Maps start -------------------

    // sets ref for google map to allow finding it
    const refMap = useRef(null);

    useEffect(()=>{
      console.log("local", props)
        refMap.current.map.panTo(location)
    },[location])

    // map styling
    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    // handles centering of marker on map move
    const handleBoundsChanged = () => {
        if (refMap.current) {
            const mapCenter = {
                lat: refMap.current.map.center.lat(),
                lng: refMap.current.map.center.lng()
            }
            setListing({...listing, latLng: mapCenter})
            console.log(listing)
        }
    };

    // -------------------  Google Maps end  -------------------

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-row" >
                <div className="col-md-12 mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" id="name" value={listing.latLng} onChange={handleChange} 
                        className= "form-control" 
                    ></input>
                    
                </div>
            </div>

            <div className="form-row" >
                <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <textarea rows="5" id="description" value={listing.description} onChange={handleChange} 
                        className= "form-control"
                    ></textarea>
                    
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="image" onChange={handleFileAddition}></input>
                    <label className="custom-file-label" htmlFor="image">{listing.image.name ? listing.image.name : "Choose image file"}</label>
                </div>
            </div>

            <div className="form-row" >
                <div className="col-md-12">
                    <label className="form-label" >Location</label>
                </div>
            </div>
            <div className="input-group mb-3 border rounded" style={{height: '300px'}} >
                <Map
                    google={props.google}
                    zoom={14}
                    style={mapStyles}
                    streetViewControl={false}
                    initialCenter={listing.latLng} 
                    ref={refMap}
                    onBoundsChanged={useCallback(handleBoundsChanged,[handleBoundsChanged])} 
                >
                    <Marker 
                        position={listing.latLng}
                    />
                </Map>
            </div>

            <input type="submit" className="btn btn-outline-primary btn-block" ></input>

        </form>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_KEY
})(ListingForm)