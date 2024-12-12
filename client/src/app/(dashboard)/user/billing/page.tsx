"use client";
import Loading from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useGetTransactionsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const UserBillingPage = () => {
  const [paymentType, setPaymentType] = useState("all");
  const { user, isLoaded } = useUser();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    });

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesType =
        paymentType === "all" || transaction.paymentProvider === paymentType;

      return matchesType;
    }) || [];

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to view your billing information.</div>;

  return (
    <div className="billing">
      <h2 className="billing__title"></h2>
      <div className="billing__filters">
        <Select value={paymentType} onValueChange={setPaymentType}>
          <SelectTrigger className="billing__select">
            <SelectValue placeholder="Payment Type" />
          </SelectTrigger>

          <SelectContent className="billing__select-content">
            <SelectItem className="billing__select-item" value="all">
              All Types
            </SelectItem>
            <SelectItem className="billing__select-item" value="stripe">
              Stripe
            </SelectItem>
            <SelectItem className="billing__select-item" value="paypal">
              Paypal
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="billing__grid">
        {isLoadingTransactions ? (
          <Loading />
        ) : (
          <Table className="billing__table">
            <TableHeader className="billing__table-header">
              <TableRow className="biliing__table-header-row">
                <TableHead className="billing__table-cell">Date</TableHead>
                <TableHead className="billing__table-cell">Amount</TableHead>
                <TableHead className="billing__table-cell">
                  Payment Method
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="billing__table-body">
              {filteredData.length > 0 ? (
                filteredData.map((transaction) => (
                  <TableRow
                    className="billing__table-row"
                    key={transaction.transactionId}
                  >
                    <TableCell className="billing__table-cell">
                      {new Date(transaction.dateTime).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="billing__table-cell billing__amount">
                      {formatPrice(transaction.amount)}
                    </TableCell>
                    <TableCell className="billing__table-cell">
                      {transaction.paymentProvider}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="billing__table-row">
                  <TableCell
                    className="billing__table-cell text-center"
                    colSpan={3}
                  >
                    No transactions to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserBillingPage;
