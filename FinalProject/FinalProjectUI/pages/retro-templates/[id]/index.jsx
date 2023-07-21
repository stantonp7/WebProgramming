import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Card } from "@mantine/core";

export default function RetroTemplate(props) {
  const router = useRouter();
  const [retroTemplate, setRetroTemplate] = useState({}); 
  const {id} = router.query
  const fetchRetroTemplate = async (id) => {
    const response = await fetch('http://localhost:3002/Retrospective-Templates/'+ id);
    const a = await response.json();
    a.data.columns = a.data.columns.sort((a, b) => {
      return a.pos - b.pos;
    });
    setRetroTemplate(a.data);
}
  useEffect(() => {
    console.log(id);

    //fetch the retro template
    fetchRetroTemplate(id);
  }, [id]);

  return <Card shadow = "sm" padding="lg" radius="md" withBorder>
      <h1>{retroTemplate.name}</h1>
      {retroTemplate.columns && retroTemplate.columns.map((column) => {
          return <span>{column.name}</span>
  })}
</Card>
}