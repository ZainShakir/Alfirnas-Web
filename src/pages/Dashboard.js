import React, { useState, useEffect } from "react";
import { db } from "../Config/Config";
import { useAuth } from "../context/AuthContext";
import Loading from "../Components/Loading/Loading";
import { collection, getDocs, where, query } from "firebase/firestore";
import Alfirnas from "./Alfirnas";
import MedLog from "./MedLog";

function Dashboard() {
  const { currentUser } = useAuth();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const query1 = collection(db, "users");
        const q = query(query1, where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setRole(userData.role);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  console.log("currentUser", currentUser);
  console.log("role", role);

  while (loading) {
    return <Loading />;
  }

  return <>{role === "admin" ? <Alfirnas /> : <MedLog />}</>;
}

export default Dashboard;
