# Capillary Timezone Explorer

An interactive web application for developers, PMs, and configuration teams to understand exactly how date and time values are handled across every Capillary module, API, and event.

## 🚀 Live App

> After deploying to GitHub Pages, your URL will be:
> `https://<your-username>.github.io/capillary-tz-explorer`

## 📦 What's Inside

A single-file, zero-dependency interactive app covering:

| Section | Description |
|---|---|
| **Overview** | High-level summary + key rules |
| **Core Concepts** | Org TZ vs Server TZ vs Input TZ |
| **Clusters & Clocks** | Live clocks for India, EU, APAC2, US, CN |
| **Module Explorer** | Click-to-expand cards for all 13 modules |
| **Full Matrix** | Complete module × component × timezone table |
| **API Behavior** | GET, POST/PUT, Transaction, Rewards Catalog |
| **Behavioural Events** | Offset preservation, epoch ms, examples |
| **Time Simulator** | Interactive flow tracer for any timestamp |
| **Config Guide** | Pre-2026 vs 2026+ orgs, config flags |
| **Exclusions** | What's NOT standardized and edge cases |

## 🏗️ Deploy to GitHub Pages

### Step 1: Create a GitHub repository

```bash
gh repo create capillary-tz-explorer --public --description "Capillary Timezone Explorer"
```

Or create manually at github.com/new

### Step 2: Push this folder

```bash
cd "capillary-tz-explorer"
git init
git add .
git commit -m "Initial: Capillary Timezone Explorer"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/capillary-tz-explorer.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch, **/ (root)** folder
5. Click **Save**
6. Wait ~1–2 minutes, then visit:
   `https://<your-username>.github.io/capillary-tz-explorer`

## 🎯 Key Findings (TL;DR)

### The 3 Timezone References
- **Org Timezone** → UI display (most modules)
- **Server Timezone** → GET API responses, internal processing
- **Input Timezone** → Preserved as offset field for local-time eligibility

### Modules & Their Timezone
| Module | UI Display TZ | Special Notes |
|---|---|---|
| MemberCare | Org TZ (user-switchable) | IANA dropdown available |
| Promotions | Selected IANA TZ (duration) / Org TZ (updated at) | Two TZs on same listing! |
| Campaigns | Org TZ | No selection allowed |
| Journeys | Org TZ | View only |
| Audience | Org TZ (listings) / **Server TZ (filters)** | ⚠️ Filter dates use UTC |
| Cart Promotions | Org TZ | |
| Streaks | Org TZ | |
| Milestones | Org TZ | |
| Offers/Gift Vouchers | Org TZ | Excluded from full standardization |
| Alternate Currency | Org TZ | |
| Gift Cards | Org TZ | |
| Rewards Catalog | Server TZ (default) | Enable `CONF_ENABLE_ORG_TIMEZONE` for org TZ |
| Insights | **Not standardized** | Legacy behavior |

### API Pattern
- All **GET APIs** → Server TZ in ISO 8601
- **Shadow ISO fields** (`*ISO`) added alongside legacy fields
- **Transaction GET** → `billingTime` (server TZ) + `billingTimeInputOffset` (original)
- **Behavioural Events** → epoch ms + `eventDateTimeInputOffset` (original)

### Configuration
- **2026+ orgs**: All enabled by default
- **Pre-2026 orgs**: Contact Capillary Product Support to enable

## 📚 Source Documentation

- [Timezone Introduction](https://docs.capillarytech.com/docs/timezone_introduction)
- [How Timezone Works](https://docs.capillarytech.com/docs/how-timezone-works)
- [Enabling Timezone Standardisation](https://docs.capillarytech.com/docs/enabling-timezone-standardisation)
- [Timezone Management API Overview](https://docs.capillarytech.com/reference/timezone-management-api-overview)
- [Handling DateTime in APIs](https://docs.capillarytech.com/reference/handling-datetime-in-apis)
- [Timezone in Rewards Catalog](https://docs.capillarytech.com/reference/timezone-in-rewards-catalog)
- [Behavioural Events Timezone](https://docs.capillarytech.com/reference/timezone-handling-in-behavioural-events)

---

Built from Capillary official documentation. No external dependencies — pure HTML/CSS/JS.
