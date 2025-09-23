import { UsersTable } from "@/components/users-table/UsersTable";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, fadeInBottom } from "@/lib/animations";
import { Filter, Search, Settings } from "lucide-react";

function UsersHeader() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight drop-shadow-lg pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Users
      </motion.h1>

      <motion.p
        className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        Manage your user base with powerful tools for filtering, sorting, and
        pagination. Built with client-side processing for responsive
        interactions
      </motion.p>

      {/* Animated feature indicators */}
      <motion.div
        className="flex items-center gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="w-4 h-4 text-violet-600" />
          <span>Advanced Search</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Filter className="w-4 h-4 text-purple-600" />
          <span>Smart Filtering</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Settings className="w-4 h-4 text-fuchsia-600" />
          <span>Bulk Actions</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Users() {
  return (
    <motion.div
      className="p-4 sm:p-6 space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <UsersHeader />

      <motion.div variants={fadeInBottom}>
        <UsersTable />
      </motion.div>
    </motion.div>
  );
}
