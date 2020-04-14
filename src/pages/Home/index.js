import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addReserve } from '../../store/modules/reserve/actions';

import { MdFlightTakeoff } from 'react-icons/md'
import api from '../../services/api';

import './style.css';

export default function Home() {
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

  // Esse useEffect traz a api, que contém os dados do 3333
  useEffect(() => {

    async function loadApi(){
      const response = await api.get('trips');
      setTrips(response.data);
    }
    loadApi();
  }, [])

  // Quando clicar no botão, a trip q foi mapeada é passada
  function handleAdd(trip){
    dispatch(addReserve(trip));
  }

  return (
    <div>
      <div className="box">
        {trips.map(trip => (
          <li key={trip.id}>
            <img src={trip.image} alt={trip.title}/>
            <strong>{trip.title}</strong>
            <span>Status: {trip.status ? 'Disponível' : 'Indisponível'}</span>
            <button
              type="button"
              onClick={() => handleAdd(trip)}
            > 
              <div>
                <MdFlightTakeoff size={16} color="#fff"/>
              </div>
              <span>Solicitar Reserva</span>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
