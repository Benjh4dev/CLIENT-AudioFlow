import { firestore } from "@/services/firestore";
import { collection, getDocs, getDoc, doc, onSnapshot, updateDoc, addDoc, where, query, deleteDoc, orderBy } from "firebase/firestore";
import { Song } from "@/interfaces";


export async function togglePlay(playerDocId: string, isPlaying: boolean) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const playerDoc = await getDoc(playerDocRef);

  if (playerDoc.exists()) {
    await updateDoc(playerDocRef, {
      isPlaying: isPlaying,
    });
  } else {
    console.log("El documento del reproductor no existe.");
  }
};

export async function updateVolume(playerDocId: string, volume: number) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    volume: volume,
  });
};

export async function updateCurrentTime(playerDocId: string, currentTime: number) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    currentTime: currentTime,
  });
};

export async function setSong(playerDocId: string, song: Song) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  await updateDoc(playerDocRef, {
    currentSong: song,
  });
};

export async function addToQueue(playerDocId: string, song: Song) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const queueRef = collection(playerDocRef, "queue");
  const clientTimestamp = new Date();
  await addDoc(queueRef, {
    song: song,
    timestamp: clientTimestamp,
  });
};

export async function removeFromQueue(playerDocId: string, song: Song) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const queueRef = collection(playerDocRef, "queue");
  const q = query(queueRef, where("song.id", "==", song.id));
  
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc: any) => {
    deleteDoc(doc.ref);
  });
}

export async function loadQueue(playerDocId: string) {
  const playerDocRef = doc(firestore, "player", playerDocId);
  const queueRef = collection(playerDocRef, "queue");
  const q = query(queueRef, orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  const queue: Song[] = [];
  querySnapshot.forEach((doc) => {
    queue.push(doc.data().song);
  });
  return queue;
}

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