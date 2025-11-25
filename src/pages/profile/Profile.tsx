import { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../../services/userService";

export interface User {
  id: string
  name: string;
  surname: string;
  email: string;
  phone: string;
}

interface ProfileProps { }

const Profile: React.FC<ProfileProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    surname: '',
    email: '',
    phone: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState<User | null>(null);


  const loadUserData = async () => {
    const user = await getUserData();
    if (user) {
      setUser(user);
      setFormData(user);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSave = async () => {
    const newUser = await updateUserData(formData);
    if (newUser) {
      console.log('Dati salvati:', formData);
      setFormData(newUser);
      setUser(newUser);
      setIsEditing(false);
    } else {
      alert("Error");
    }

  };

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert('Le password non corrispondono!');
      return;
    }
    console.log('Password modificata');
    setIsChangingPassword(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleDelete = () => {
    console.log('Account eliminato');
    alert('Account eliminato');
  };

  if (isChangingPassword) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Modifica Password</h2>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nuova Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Conferma Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handlePasswordChange} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cambia Password
          </button>
          <button onClick={() => { setIsChangingPassword(false); setPassword(''); setConfirmPassword(''); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Annulla
          </button>
        </div>
      </div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Conferma Eliminazione</h2>
        <p>Sei sicuro di voler eliminare il tuo account?</p>
        <p style={{ color: 'red', fontWeight: 'bold' }}>Questa azione è irreversibile!</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Elimina Definitivamente
          </button>
          <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Annulla
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Modifica Profilo</h2>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nome:</label>
          <input
            type="text"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Cognome:</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Telefono:</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Salva
          </button>
          <button onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Annulla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Il Mio Profilo</h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Nome:</strong> {user?.name}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Cognome:</strong> {user?.surname}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong> {user?.email}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>Telefono:</strong> {user?.phone}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setIsEditing(true)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Modifica
        </button>
        <button onClick={() => setIsChangingPassword(true)} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cambia Password
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Elimina Account
        </button>
      </div>
    </div>
  );
};

export default Profile;