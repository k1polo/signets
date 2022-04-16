import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function ModificationDossier({ ouvertForm, setOuvertForm, gererModifierDossier, titre : Titre, couleur : Couleur, id, couverture : Couverture}) {
    const [titre, setTitre] = useState(Titre);
    const [couverture, setCouverture] = useState(Couverture);
    const [couleur, setCouleur] = useState(Couleur);

    const gererOuvrir = () => {
        setOuvertForm(true);
    };  

    const gererFermer = () => {
        // Il faut réinitialiser les états des valeurs de formulaire car sinon 
        // les dernières valeurs saisies seront sauvegardées dans les 'états'
        // du composant
        setTitre(Titre);
        setCouverture(Couverture);
        setCouleur(Couleur)
        setOuvertForm(false);
    };

		function gererSoumettre() {
			// Code qui gère l'ajout dans Firestore
            if(titre.search(/[a-z]{2,}/i) != -1) {
                gererModifierDossier(titre, couverture, couleur);
                gererFermer();
            }
		}

    return (
        <div>
            <Dialog open={ouvertForm} onClose={gererFermer}>
                <DialogTitle>Modifier ce dossier</DialogTitle>
                <DialogContent>
                    {/* Titre du dossier */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="titre"
                        label="Titre du dossier"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setTitre(e.target.value)}
                        value={titre}
                    />
                    {/* URL de l'image */}
                    <TextField
                        margin="dense"
                        id="couverture"
                        label="Image couverture du dossier"
                        type="url"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: "1.5rem" }}
                        onChange={e => setCouverture(e.target.value)}
                        value={couverture}
                    />
                    {/* Choix de couleur */}
                    <TwitterPicker
                        triangle='hide'
                        color={couleur}
                        colors={["#900", "#090", "#009", "orange"]}
                        width="auto"
                        onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
                        value={couleur}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={gererFermer}>Annuler</Button>
                    <Button onClick={gererSoumettre}>Soumettre</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
