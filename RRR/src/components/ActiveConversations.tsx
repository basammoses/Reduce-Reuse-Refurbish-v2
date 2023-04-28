import { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ConversationModel } from "../models/Conversation";


export function ActiveConversations() {
  const { user } = useContext(AuthContext);
  const [conversations, setActiveConversations] = useState<ConversationModel[]>(
    []
  );
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://reduce.herokuapp.com/conversations", {
        headers: {
          Authorization: `Token ${user?.token}`,
        },
      });
      const data = await res.json();
      setActiveConversations(data);
    }
    fetchUsers();
  }, [user]);


  
  function formatMessageTimestamp(timestamp?: string) {
    if (!timestamp) return;
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }
  
  function onChange(e: any) {
    setName(e.target.value);
    console.log(name)
  }

 

  

  return (
    <div>
      <form>
        <input type="text" onChange={onChange} value={name} placeholder="create a room!" />
        <Link
          to={`/chats/${name}`}
          key={name}
      
        >
          <button>create!</button>
        </Link>

      </form>
      {conversations.map((c) => (
        <Link
          to={`/chats/${c.name}`}
          key={c.name}
      
        >
          <div className="border border-gray-200 w-full p-3">
            <h3 className="text-xl font-semibold text-gray-800">
              {c.name}
            </h3>
            {/* <div className="flex justify-between">
              <p className="text-gray-700">{c.last_message?.content}</p>
              <p className="text-gray-700">
                {formatMessageTimestamp(c.last_message?.timestamp)}
              </p>
              <p className="text-gray-700">sender</p>
            </div> */}
          </div>
        </Link>
      ))}
      
    </div>
  );
}
