"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Heatmap } from "@/components/heatmap";

export type PracticeRecord = {
  id: string;
  date: string;
  platform: string;
  title: string;
  difficulty: string;
  status: string;
  problemUrl?: string;
};

type PracticeDay = {
  date: string;
  count: number;
};

const STORAGE_KEY = "wen__xvn-practice-records";
const defaultRecord: Omit<PracticeRecord, "id"> = {
  date: new Date().toISOString().slice(0, 10),
  platform: "力扣",
  title: "",
  difficulty: "中等",
  status: "已通过",
  problemUrl: ""
};

function loadRecords(): PracticeRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PracticeRecord[]) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: PracticeRecord[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function mergeHeatmap(baseData: PracticeDay[], records: PracticeRecord[]) {
  const map = new Map(baseData.map((item) => [item.date, item.count]));

  for (const record of records) {
    map.set(record.date, (map.get(record.date) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function PracticeTracker({ baseData }: { baseData: PracticeDay[] }) {
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  useEffect(() => {
    setRecords(loadRecords());
  }, []);
  const [form, setForm] = useState(defaultRecord);

  const mergedData = useMemo(() => mergeHeatmap(baseData, records), [baseData, records]);
  const totalSolved = useMemo(() => baseData.reduce((sum, item) => sum + item.count, 0) + records.length, [baseData, records]);
  const platformCount = useMemo(() => new Set(records.map((record) => record.platform)).size, [records]);
  const latestRecords = useMemo(() => [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8), [records]);

  function updateRecords(next: PracticeRecord[]) {
    setRecords(next);
    saveRecords(next);
  }

  function addRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim()) return;

    updateRecords([
      {
        ...form,
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title: form.title.trim(),
        problemUrl: form.problemUrl?.trim()
      },
      ...records
    ]);
    setForm({ ...defaultRecord, date: form.date });
  }

  function removeRecord(id: string) {
    updateRecords(records.filter((record) => record.id !== id));
  }

  return (
    <div className="mt-5 space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-2xl font-bold">{totalSolved}</p>
          <p className="text-sm text-slate-500">累计刷题</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-2xl font-bold">{records.length}</p>
          <p className="text-sm text-slate-500">本地记录</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-2xl font-bold">{platformCount}</p>
          <p className="text-sm text-slate-500">练习平台</p>
        </div>
      </div>

      <Heatmap data={mergedData} />

      <form onSubmit={addRecord} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-2 lg:grid-cols-6">
        <input
          type="date"
          value={form.date}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          value={form.platform}
          onChange={(event) => setForm((prev) => ({ ...prev, platform: event.target.value }))}
          placeholder="平台"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="题目名称"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2"
        />
        <select
          value={form.difficulty}
          onChange={(event) => setForm((prev) => ({ ...prev, difficulty: event.target.value }))}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option>简单</option>
          <option>中等</option>
          <option>困难</option>
        </select>
        <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          添加记录
        </button>
        <input
          value={form.problemUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, problemUrl: event.target.value }))}
          placeholder="题目链接（可选）"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 sm:col-span-2 lg:col-span-6"
        />
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr_72px] bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500 dark:bg-slate-800">
          <span>日期</span>
          <span>平台</span>
          <span>题目</span>
          <span>难度</span>
          <span>操作</span>
        </div>
        {latestRecords.length > 0 ? (
          latestRecords.map((record) => (
            <div key={record.id} className="grid grid-cols-[1fr_1fr_1.5fr_1fr_72px] items-center border-t border-slate-100 px-4 py-3 text-sm dark:border-slate-800">
              <span>{record.date}</span>
              <span>{record.platform}</span>
              {record.problemUrl ? (
                <a href={record.problemUrl} target="_blank" rel="noreferrer" className="truncate text-emerald-600 hover:underline">
                  {record.title}
                </a>
              ) : (
                <span className="truncate">{record.title}</span>
              )}
              <span>{record.difficulty}</span>
              <button type="button" onClick={() => removeRecord(record.id)} className="text-left text-xs text-slate-400 hover:text-red-500">
                删除
              </button>
            </div>
          ))
        ) : (
          <div className="border-t border-slate-100 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-800">
            暂无记录
          </div>
        )}
      </div>
    </div>
  );
}
