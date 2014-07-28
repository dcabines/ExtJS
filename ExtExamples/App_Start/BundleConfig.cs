﻿using System.Web;
using System.Web.Optimization;

namespace ExtExamples {
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/ext").Include(
                "~/Scripts/ext-base.js",    
                "~/Scripts/ext-core-debug.js",
                "~/Scripts/ext-all-debug.js"));

            bundles.Add(new StyleBundle("~/Content/css")
                .Include(
                    "~/Content/css/ext-all.css",
                    "~/Content/css/site.css"));
        }
    }
}
