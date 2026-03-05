import { useTranslation } from 'react-i18next';
import type { CompleteDatabase } from '../types';

interface Props {
  complete: CompleteDatabase;
}

interface TableProps {
  title: string;
  points: { id: string; location: string; location_sv?: string }[];
}

function EarthTable({ title, points }: TableProps) {
  const { t } = useTranslation();
  return (
    <div className="earth-table-section">
      <h3>{title}</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t('earth.colNr')}</th>
              <th>{t('earth.colLocationEn')}</th>
              <th>{t('earth.colLocationSv')}</th>
            </tr>
          </thead>
          <tbody>
            {points.map(p => (
              <tr key={p.id}>
                <td className="mono">{p.id}</td>
                <td>{p.location}</td>
                <td>{p.location_sv || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EarthPoints({ complete }: Props) {
  const { t } = useTranslation();
  const ep = complete.reference.earth_points;

  return (
    <div className="earth-points">
      <p className="earth-desc">{ep.description}</p>

      <div className="earth-checklist">
        <h3>{t('earth.checklist')}</h3>
        <ul>
          {ep.check_list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <EarthTable title="Fig 10.34 – Alla modeller" points={ep.earth_point_table_fig_10_34} />
      <EarthTable title="Fig 13.77 – 4-cylinder" points={ep.earth_point_table_fig_13_77_4cyl} />
      <EarthTable title="Fig 13.78 – 6-cylinder" points={ep.earth_point_table_fig_13_78_6cyl} />
    </div>
  );
}
