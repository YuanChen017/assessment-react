"use client"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"


export default function Home() {
  const [page, setPage] = useState(1)
  const [totalpage, setTotalpage] = useState(0)
  const pagesize = 5
  const [apidata, setApidata] = useState([])
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setApidata(data.results)
        setTotalpage(data.info.pages)
      })
  }, [page])
  const pagination = useMemo(() => {
    let startpage = page
    let result: Array<number> = []
    if (page === 1) {
      result = [1, 2, 3, 4, 5]
      return result
    }
    for (let i = 0; i < pagesize; i++) {
      if (startpage <= totalpage) {
        result[i] = startpage
        startpage += 1
      }
    }
    return result
  }, [page])
  return <>
    <h1>Rick And Morty Characters</h1>
    <div className="showcase">
      {apidata.map((character: any) => {
        return <div key={character.id} className="character">
          <Image
            src={character.image}
            width={200}
            height={200}
            alt={character.name}
          />
          <div>{character.name}</div>
        </div>
      })}
    </div>
    <div className="pagination">
      <button onClick={() => {
        if (page == 1) {
          setPage(page)
        }
        else {
          setPage(page - 1)
        }
      }}>{`<`}</button>
      {pagination.map((item) => {
        return <button key={`page-${item}`} value={item} onClick={() => setPage(item)}>{item}</button>
      })}
      <button onClick={() => {
        if (page == 42) {
          setPage(page)
        }
        else {
          setPage(page + 1)
        }
      }}>{`>`}</button>
    </div>
  </>
}