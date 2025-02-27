import React, { useState, useEffect } from 'react';

export default function MocapiTest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [rideType, setRideType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [childSeat, setChildSeat] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mockapi.io/your-endpoint');
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const newData = {
      name,
      email,
      phone,
      location,
      dropLocation,
      rideType,
      passengers,
      pickupTime,
      paymentMethod,
      promoCode,
      childSeat,
      wheelchair,
      notes,
    };

    try {
      const response = await fetch('https://67ad88033f5a4e1477ddf5ae.mockapi.io/mocapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) throw new Error("Failed to submit data.");

      const data = await response.json();
      setFormData([...formData, data]);
      resetForm();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setDropLocation("");
    setRideType("");
    setPassengers("");
    setPickupTime("");
    setPaymentMethod("");
    setPromoCode("");
    setChildSeat(false);
    setWheelchair(false);
    setNotes("");
    setTermsAccepted(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = formData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.dropLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setFormData(sortedData);
  };

  return (
    <div>
      <h1>Careem Ride Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <h3>User Information</h3>
        <p>Enter Your Name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <p>Enter Your Phone Number</p>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <p>Enter Your Email (Optional)</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <p>Ride Details</p>
        <p>Enter Pickup Location</p>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <p>Enter Drop-off Location</p>
        <input type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} required />

        <p>Select Ride Type</p>
        <select value={rideType} onChange={(e) => setRideType(e.target.value)} required>
          <option value="">Select Ride Type</option>
          <option value="Economy">Economy</option>
          <option value="Go Mini">Go Mini</option>
          <option value="Business">Business</option>
          <option value="Bike">Bike</option>
          <option value="Delivery">Delivery</option>
        </select>

        <p>Number of Passengers</p>
        <input type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} required />

        <p>Ride Preferences</p>
        <p>Select Pickup Time</p>
        <input type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

        <p>Select Payment Method</p>
        <input type="radio" name="paymentMethod" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'Cash'} /> Cash
        <input type="radio" name="paymentMethod" value="Credit/Debit Card" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'Credit/Debit Card'} /> Credit/Debit Card
        <input type="radio" name="paymentMethod" value="Wallet" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'Wallet'} /> Wallet

        <p>Promo Code (Optional)</p>
        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />

        <p>Special Requests (Optional)</p>
        <label>
          <input type="checkbox" checked={childSeat} onChange={() => setChildSeat(!childSeat)} />
          Need a Child Seat?
        </label><br />
        <label>
          <input type="checkbox" checked={wheelchair} onChange={() => setWheelchair(!wheelchair)} />
          Wheelchair Accessible?
        </label><br />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional Notes" />

        <p>Terms & Conditions</p>
        <label>
          <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
          I confirm that all the provided details are correct and agree to Careem's ride policies.
        </label><br />

        <button type="submit" disabled={!termsAccepted}>Submit</button>
      </form>

      <div>
        <input type="text" placeholder="Search" onChange={handleSearch} value={searchQuery} />
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Full Name</th>
              <th onClick={() => handleSort('phone')}>Phone Number</th>
              <th onClick={() => handleSort('location')}>Pickup Location</th>
              <th onClick={() => handleSort('dropLocation')}>Drop-off Location</th>
              <th onClick={() => handleSort('rideType')}>Ride Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>{item.dropLocation}</td>
                <td>{item.rideType}</td>
                <td>
                  <button onClick={() => alert("Are You Sure You Want To Delete This record")}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
