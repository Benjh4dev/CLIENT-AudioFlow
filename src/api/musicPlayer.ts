import { firestore } from "@/services/firestore";
import { collection, getDocs, query, where, doc, onSnapshot, getDoc } from "firebase/firestore";
import { Song } from "@/interfaces";

export async function getMusicPlayer(user_id: string) {
    try {
        const q = query(collection(firestore, "player"), where("user_id", "==", user_id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error(error);
    }
};

export function playMusicPlayer() {

};

export function stopMusicPlayer() {

};

export function updateVolume(volume: number) {

};

export function updateCurrentTime(currentTime: number) {

};

export function setSong(song: Song) {

};

export function addSongToQueue(song: Song) {

};

let unsubscribe: (() => void) | null = null;
export function subscribeMusicPlayer(docId: string, callback: (data: any) => void) {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
        console.log("Se detuvo la suscripción al reproductor de música.");
      } else {
        unsubscribe = onSnapshot(doc(firestore, "player", docId), (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            callback(data);
          } else {
            console.log("El documento no existe o ha sido eliminado.");
          }
        });
      }
};