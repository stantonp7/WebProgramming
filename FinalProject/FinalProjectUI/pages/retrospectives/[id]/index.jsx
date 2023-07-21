import React from "react";
import { useRouter } from 'next/router';

export default function Retrospective(props) {
  const router = useRouter();
  const {id} = router.query

  return <span>Retrospective! {id}</span>;
}