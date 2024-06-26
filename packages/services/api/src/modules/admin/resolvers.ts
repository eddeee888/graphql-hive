import { parseDateRangeInput } from '../../shared/helpers';
import { AdminModule } from './__generated__/types';
import { AdminManager } from './providers/admin-manager';

export const resolvers: AdminModule.Resolvers = {
  Query: {
    admin() {
      return {};
    },
  },
  AdminQuery: {
    stats(_, { period, resolution }) {
      return {
        period,
        resolution,
      };
    },
  },
  AdminStats: {
    organizations({ period }, __, { injector }) {
      const dateRange = parseDateRangeInput(period);
      return injector.get(AdminManager).getStats({
        from: dateRange.from,
        to: dateRange.to,
      });
    },
    general({ period, resolution }) {
      return { period, resolution };
    },
  },
  AdminGeneralStats: {
    operationsOverTime({ period, resolution }, _, { injector }) {
      const dateRange = parseDateRangeInput(period);
      return injector.get(AdminManager).getOperationsOverTime({
        period: {
          from: dateRange.from,
          to: dateRange.to,
        },
        resolution,
      });
    },
  },
  AdminOrganizationStats: {
    async operations(stats, _, { injector }) {
      const results = await injector.get(AdminManager).countOperationsPerOrganization({
        period: stats.period,
      });

      return results.find(r => r.organization === stats.organization.id)?.total ?? 0;
    },
  },
};
