import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { TableHeader } from "./table/table-header";
import { TableData } from "./table/table-data";
import { IconButton } from "./IconButton";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { Table } from "./table/table";

dayjs.extend(relativeTime)

interface Attenddes {
  id: string,
  name: string,
  email: string
  createdAt: string
  checkedInAt: string
}

export function AttendeeList() {
  const [querySearch, setQuerySearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('querySearch')) {
      return url.searchParams.get('querySearch') ?? ''
    }

    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })
  const [attenddes, setAttenddes] = useState<Attenddes[]>([])
  const [total, setTotal] = useState(0)


  const totalPerPage = Math.ceil(total / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearchPage(event.target.value)
    setCurrentPage(1)
  }

  function onNextPage() {
    setCurrentPage(page + 1)
  }

  function onPreviousPage() {
    setCurrentPage(page - 1)
  }

  function onFirstPage() {
    setCurrentPage(1)
  }

  function onLastPage() {
    setCurrentPage(page)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function setCurrentSearchPage(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('querySearch', search)

    window.history.pushState({}, '', url)

    setQuerySearch(search)
  }

  const url = new URL('http://localhost:3333/event/clulzhhzc00002v6rz08k7sr0/attenddes')

  url.searchParams.set('pageIndex', String(page - 1))

  if (querySearch.length > 0) {
    url.searchParams.set('querySearch', querySearch)
  }

  useEffect(() => {
    fetch(url).then(response => response.json())
      .then(data => {
        setAttenddes(data.attenddes)
        setTotal(data.total)
      })
  }, [page, querySearch])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 rounded-lg border border-white/10 bg-transparent flex items-center gap-3">
          <Search className="size-4 text-teal-300" />
          <input onChange={onSearchInputChanged} value={querySearch} className="bg-transparent flex-1  border-0 p-0 text-sm focus:outline-none focus:ring-0" type="text" placeholder="Buscar participante..." />
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <th style={{ width: 48 }} className="py-3 px-4 text-sm font-semibold text-left">
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </th>

            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }} className="py-3 px-4 text-sm font-semibold text-left"></TableHeader>
          </tr>
        </thead>
        <tbody>
          {/* Paginção fake pelo lado do front-end */}
          {/* {attenddes.slice((page - 1) * 10, (page * 10)).map(attendde => { */}
          {attenddes.map(attendde => {
            return (
              <tr key={attendde.id} className="border-b border-white/10 hover:bg-white/5">
                <TableData className="py-3 px-4 text-sm text-zinc-300">
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                </TableData>
                <TableData>{attendde.id}</TableData>
                <TableData className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">{attendde.name}</span>
                    <span>{attendde.email}</span>
                  </div>
                </TableData>
                <TableData>{dayjs().to(attendde.createdAt)}</TableData>
                <TableData>{!attendde.checkedInAt
                  ? <span className="text-emerald-300">Não fez check-in</span>
                  : dayjs().to(attendde.checkedInAt)}</TableData>
                <TableData>
                  <IconButton transparent={true}>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableData>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableData colSpan={3}>Mostrando {attenddes.length} of {total} itens</TableData>
            <TableData className="text-right" colSpan={3}>

              <div className="inline-flex items-center gap-8">
                <span>Pagina {page} de {totalPerPage}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={onFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={onPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={onNextPage} disabled={page === totalPerPage}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={onLastPage} disabled={page === totalPerPage}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableData>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
} 