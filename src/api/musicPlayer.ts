// DEFINIR FUNCIONES DE ESCRITURA Y LECTURA DE DATOS DE LA API DEL MUSIC PLAYER
import { Song } from "@/interfaces";
import { firestore } from "@/services/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

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