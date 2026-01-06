# phugl.dk - Kravspecifikation v2.0

> Denne fil er den autoritative kilde til hjemmesidens arkitektur, indhold og integreret kommunikationsløsning.

**Sidst opdateret:** 2026-01-06

---

## 1. Overblik

**Formål:** phugl.dk er en hjemmeside for AI-konsulentvirksomheden phugl, der hjælper organisationer med at implementere AI i hverdagen - trygt, konkret og uden hype.

**Målgrupper:**
- Ledere i offentlige og private organisationer, der overvejer AI
- Medarbejdere, der skal lære at bruge AI-værktøjer
- Nysgerrige, der vil holde sig opdateret på AI-nyheder

**Kerneværdier (fra brand pack):**
- Jordforbindelse: Alt skal kunne udføres mandag morgen
- Lethed: Vi reducerer friktion og beslutningsstress
- Tryghed: Vi bruger rammer, governance og kvalitetssikring
- Ærlighed: Vi lover ikke magi. Vi dokumenterer effekt.

---

## 2. Integreret kommunikationsløsning

### 2.1 Vision

En automatiseret content-pipeline der:
1. **Indsamler** nyheder fra nyhedsbreve (TLDR, etc.)
2. **Processerer** med AI og scorer relevans
3. **Publicerer** nyheder automatisk på phugl.dk/nyheder
4. **Foreslår** guides baseret på høj-relevans nyheder
5. **Genererer** blog-udkast til godkendelse
6. **Distribuerer** godkendt indhold til sociale medier (Facebook, LinkedIn, X)

### 2.2 Arkitektur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CONTENT PIPELINE                                    │
│                                                                             │
│  ┌──────────────┐    ┌──────────────────────────────────────────────────┐  │
│  │   KILDER     │    │            OPENAI AGENTS SDK                      │  │
│  │              │    │                                                    │  │
│  │ • Gmail      │───▶│  ┌────────────────┐    ┌────────────────┐        │  │
│  │   (TLDR)     │    │  │ News Extractor │    │ Guide Writer   │        │  │
│  │ • Outlook    │    │  │     Agent      │    │     Agent      │        │  │
│  │ • RSS feeds  │    │  │                │    │                │        │  │
│  └──────────────┘    │  │ Tools:         │    │ Tools:         │        │  │
│                      │  │ • WebSearchTool│    │ • WebSearchTool│        │  │
│                      │  │ • FileSearch   │    │ • FileSearch   │        │  │
│                      │  │ • EmailReader  │    │ • BlogFormatter│        │  │
│                      │  └───────┬────────┘    └───────┬────────┘        │  │
│                      │          │                     │                  │  │
│                      │          ▼                     ▼                  │  │
│                      │  ┌────────────────┐    ┌────────────────┐        │  │
│                      │  │ Social Writer  │    │ Quality Agent  │        │  │
│                      │  │     Agent      │    │                │        │  │
│                      │  │                │    │ Tjekker:       │        │  │
│                      │  │ Platforms:     │    │ • phugl-tone   │        │  │
│                      │  │ • LinkedIn     │    │ • Fakta        │        │  │
│                      │  │ • Facebook     │    │ • Links        │        │  │
│                      │  │ • X (Twitter)  │    │                │        │  │
│                      │  └───────┬────────┘    └───────┬────────┘        │  │
│                      └──────────┼─────────────────────┼──────────────────┘  │
│                                 │                     │                     │
│                                 ▼                     ▼                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         SUPABASE DATABASE                             │  │
│  │                                                                        │  │
│  │  news_items          guide_suggestions      social_posts              │  │
│  │  ├─ title            ├─ news_item_id       ├─ blog_post_id           │  │
│  │  ├─ summary          ├─ suggested_title    ├─ platform                │  │
│  │  ├─ relevance_score  ├─ outline            ├─ content                 │  │
│  │  ├─ blog_potential   ├─ status             ├─ status                  │  │
│  │  └─ auto_published   └─ task_id            └─ scheduled_at            │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                 │                                           │
│                                 ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    AI-ASSISTENT (app.phugl.dk)                        │  │
│  │                                                                        │  │
│  │  Task Feed:                                                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │ [BLOG] Guide: Sådan bruger du Claude Computer Use               │ │  │
│  │  │ Relevans: 0.89 | Fra nyhed: "Claude lancerer computer use"      │ │  │
│  │  │ [Godkend] [Redigér] [Afvis]                                     │ │  │
│  │  ├─────────────────────────────────────────────────────────────────┤ │  │
│  │  │ [SOCIAL] LinkedIn-opslag til ovenstående blog                   │ │  │
│  │  │ [Godkend] [Redigér]                                             │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                 │                                           │
│                    Efter godkendelse                                        │
│                                 ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         PUBLIKATION                                   │  │
│  │                                                                        │  │
│  │  phugl.dk/nyheder    phugl.dk/blog    LinkedIn    Facebook    X      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. OpenAI Agents SDK Implementation

### 3.1 Agent-struktur

Baseret på [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) med [WebSearchTool](https://platform.openai.com/docs/guides/tools-web-search) og [FileSearchTool](https://platform.openai.com/docs/guides/tools-file-search).

**Installation:**
```bash
pip install openai-agents
```

### 3.2 News Extractor Agent

```python
# agent-service/agents/news_extractor.py

from agents import Agent, Runner, WebSearchTool, FileSearchTool, function_tool
from typing import List
from pydantic import BaseModel

class NewsItem(BaseModel):
    title: str
    summary: str
    original_link: str
    category: str  # tools, research, business, policy
    tags: List[str]
    relevance_score: float  # 0-1
    blog_potential_score: float  # 0-1, hvor egnet til guide
    blog_potential_reason: str  # Hvorfor/hvorfor ikke egnet

@function_tool
async def read_newsletter_email(email_id: str) -> str:
    """Læs indholdet af et nyhedsbrev fra Gmail."""
    # Bruger eksisterende Gmail integration
    from lib.integrations.gmail import get_email_content
    return await get_email_content(email_id)

@function_tool
async def save_news_item(item: NewsItem) -> str:
    """Gem nyhedsartikel i databasen."""
    from lib.supabase import supabase
    result = await supabase.table('news_items').insert(item.dict()).execute()
    return f"Saved: {result.data[0]['id']}"

@function_tool
async def check_duplicate(title: str, link: str) -> bool:
    """Tjek om nyheden allerede findes."""
    from lib.supabase import supabase
    result = await supabase.table('news_items').select('id').or_(
        f"title.ilike.%{title[:50]}%,original_link.eq.{link}"
    ).execute()
    return len(result.data) > 0

news_extractor_agent = Agent(
    name="NewsExtractor",
    model="gpt-4o",
    instructions="""
Du er en dansk tech-journalist for phugl.dk.

Din opgave er at:
1. Læse nyhedsbreve (TLDR AI, TLDR Tech, etc.)
2. Identificere de vigtigste AI-nyheder
3. Skrive korte, danske resuméer
4. Vurdere relevans for danske læsere
5. Vurdere potentiale for at blive til en guide

RELEVANS-SCORING (0-1):
- 0.9-1.0: Direkte relevant for danske organisationer, nye værktøjer de kan bruge NU
- 0.7-0.9: Vigtig brancheudvikling, indirekte påvirkning
- 0.5-0.7: Interessant, men primært for tech-interesserede
- 0.0-0.5: Niche, kun relevant for udviklere/forskere

BLOG-POTENTIAL-SCORING (0-1):
- 0.9-1.0: Perfekt til guide - nyt værktøj/feature folk kan bruge, kræver forklaring
- 0.7-0.9: God kandidat - praktisk anvendelse, men lidt mere niche
- 0.5-0.7: Måske - kunne blive en guide med den rette vinkel
- 0.0-0.5: Nej - ren nyhed uden handlingsanvisning

Brug WebSearchTool til at:
- Klikke videre på links i nyhedsbrevene for mere kontekst
- Verificere facts og finde danske vinkler
- Finde relaterede artikler

Brug FileSearchTool til at:
- Søge i vidensbasen for relateret indhold
- Undgå duplikering af eksisterende guides
- Finde kontekst fra tidligere nyheder

TONE (phugl brand):
- Jordnær, konkret, uden hype
- "Mindre bøvl, mere luft"
- "Det skal virke mandag morgen"
- Undgå: "revolutionerende", "banebrydende", "game-changer"
""",
    tools=[
        WebSearchTool(),
        FileSearchTool(
            vector_store_ids=["PHUGL_KNOWLEDGE_STORE_ID"],
            max_num_results=5
        ),
        read_newsletter_email,
        save_news_item,
        check_duplicate
    ]
)
```

### 3.3 Guide Writer Agent

```python
# agent-service/agents/guide_writer.py

from agents import Agent, Runner, WebSearchTool, FileSearchTool, function_tool
from typing import List

@function_tool
async def get_news_item(news_id: str) -> dict:
    """Hent nyhedsartikel som udgangspunkt for guide."""
    from lib.supabase import supabase
    result = await supabase.table('news_items').select('*').eq('id', news_id).single().execute()
    return result.data

@function_tool
async def save_guide_draft(
    news_item_id: str,
    title: str,
    content: str,
    outline: List[str],
    target_audience: str
) -> str:
    """Gem guide-udkast og opret opgave til godkendelse."""
    from lib.supabase import supabase

    # Gem blog draft
    blog_result = await supabase.table('blog_drafts').insert({
        'news_item_id': news_item_id,
        'title': title,
        'content': content,
        'outline': outline,
        'target_audience': target_audience,
        'status': 'pending_approval'
    }).execute()

    # Opret opgave i AI-assistent
    task_result = await supabase.table('tasks').insert({
        'type': 'BLOG',
        'title': f'Guide: {title}',
        'description': f'AI-genereret guide baseret på nyhed. Målgruppe: {target_audience}',
        'metadata': {
            'blog_draft_id': blog_result.data[0]['id'],
            'news_item_id': news_item_id
        },
        'status': 'PENDING'
    }).execute()

    return f"Guide saved. Task ID: {task_result.data[0]['id']}"

@function_tool
async def format_as_mdx(title: str, content: str, tags: List[str]) -> str:
    """Formatter indhold som MDX til blog."""
    from datetime import date

    frontmatter = f"""---
title: "{title}"
description: "{content[:150]}..."
date: "{date.today().isoformat()}"
author: "Andreas Lausen"
tags: {tags}
published: false
---

"""
    return frontmatter + content

guide_writer_agent = Agent(
    name="GuideWriter",
    model="gpt-4o",
    instructions="""
Du er en teknisk skribent for phugl.dk.

Din opgave er at skrive praktiske guides baseret på AI-nyheder.

GUIDE-STRUKTUR:
1. TL;DR (2-3 sætninger for travle læsere)
2. Hvad er det? (Forklaring uden jargon)
3. Hvornår giver det mening? (Konkrete use cases)
4. Trin-for-trin (Praktisk guide)
5. Ting du skal vide (Begrænsninger, sikkerhed, pris)
6. Konklusion (Skal du bruge det? Til hvem?)

Brug WebSearchTool til at:
- Finde officiel dokumentation
- Verificere steps og konfiguration
- Finde screenshots/eksempler

Brug FileSearchTool til at:
- Finde relaterede guides vi har skrevet
- Sikre konsistent tone og stil
- Undgå gentagelser

TONE (phugl brand):
- Skriv som du taler
- Konkrete handlingsord: "vælg", "afprøv", "test"
- Vis, ikke fortæl - brug eksempler
- Vær ærlig om begrænsninger

MÅLGRUPPE:
- Ledere og medarbejdere i danske organisationer
- Ikke-tekniske læsere der vil i gang
- Folk der har hørt om AI men ikke ved hvor de skal starte
""",
    tools=[
        WebSearchTool(),
        FileSearchTool(
            vector_store_ids=["PHUGL_KNOWLEDGE_STORE_ID"],
            max_num_results=5
        ),
        get_news_item,
        save_guide_draft,
        format_as_mdx
    ]
)
```

### 3.4 Social Writer Agent

```python
# agent-service/agents/social_writer.py

from agents import Agent, Runner, function_tool
from typing import Literal

Platform = Literal["linkedin", "facebook", "x"]

@function_tool
async def get_blog_post(blog_id: str) -> dict:
    """Hent blogindlæg der skal deles."""
    from lib.supabase import supabase
    result = await supabase.table('blog_posts').select('*').eq('id', blog_id).single().execute()
    return result.data

@function_tool
async def save_social_draft(
    blog_post_id: str,
    platform: Platform,
    content: str,
    hashtags: list[str]
) -> str:
    """Gem social media draft til godkendelse."""
    from lib.supabase import supabase

    # Gem draft
    draft_result = await supabase.table('social_posts').insert({
        'blog_post_id': blog_post_id,
        'platform': platform,
        'content': content,
        'hashtags': hashtags,
        'status': 'pending_approval'
    }).execute()

    # Opret opgave
    task_result = await supabase.table('tasks').insert({
        'type': 'SOCIAL',
        'title': f'{platform.title()}-opslag til blog',
        'description': f'Del blogindlæg på {platform}',
        'metadata': {
            'social_post_id': draft_result.data[0]['id'],
            'blog_post_id': blog_post_id,
            'platform': platform
        },
        'status': 'PENDING'
    }).execute()

    return f"Social draft saved. Task ID: {task_result.data[0]['id']}"

social_writer_agent = Agent(
    name="SocialWriter",
    model="gpt-4o",
    instructions="""
Du skriver social media-opslag for phugl.dk.

Når et blogindlæg er godkendt, laver du opslag til:
1. LinkedIn (professionelt, længere format)
2. Facebook (mere afslappet, engagement-fokuseret)
3. X/Twitter (kort, hook + link)

LINKEDIN FORMAT:
- Åben med en hook/observation (1-2 linjer)
- Kort opsummering af hvad guiden handler om
- 2-3 key takeaways som bullets
- CTA: "Læs hele guiden på phugl.dk"
- 3-5 relevante hashtags
- Max 1300 tegn

FACEBOOK FORMAT:
- Mere personlig tone ("Jeg har lige skrevet om...")
- Spørg læseren noget ("Har du prøvet X?")
- Kortere end LinkedIn
- Brug emoji sparsomt (1-2 max)
- Max 500 tegn

X/TWITTER FORMAT:
- Hook der fanger interesse
- Link til guide
- 1-2 hashtags
- Max 280 tegn (inkl. link placeholder)

TONE (phugl brand):
- Jordnær, ikke sælgende
- Del viden, ikke selvpromovering
- Konkret værdi for læseren
""",
    tools=[
        get_blog_post,
        save_social_draft
    ]
)
```

### 3.5 Multi-Agent Coordinator

```python
# agent-service/agents/content_coordinator.py

from agents import Agent, Runner
from .news_extractor import news_extractor_agent
from .guide_writer import guide_writer_agent
from .social_writer import social_writer_agent

content_coordinator = Agent(
    name="ContentCoordinator",
    model="gpt-4o",
    instructions="""
Du koordinerer phugl.dk's content pipeline.

DAGLIG WORKFLOW:
1. Scan nyhedsbreve for nye AI-nyheder
2. Udtræk og score nyheder (relevans + blog-potential)
3. Auto-publicér nyheder med relevans >= 0.6
4. For nyheder med blog_potential >= 0.8, opret guide-forslag
5. Send guide-forslag til godkendelse

EFTER BLOG-GODKENDELSE:
1. Generér social media-opslag for alle platforme
2. Send opslag til godkendelse
3. Efter godkendelse, marker klar til publicering

REGLER:
- Maks 5 nyheder per dag (kvalitet over kvantitet)
- Maks 2 guide-forslag per uge
- Nyheder auto-publiceres, blogs kræver godkendelse
- Social posts oprettes først EFTER blog er publiceret
""",
    handoffs=[news_extractor_agent, guide_writer_agent, social_writer_agent]
)
```

---

## 4. Database Schema

### 4.1 Nyheder

```sql
-- Nyhedskilder
CREATE TABLE news_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,           -- "TLDR AI", "TLDR Tech", "The Rundown"
  source_type TEXT NOT NULL,    -- "email", "rss", "api"
  email_pattern TEXT,           -- For email: afsender-pattern
  rss_url TEXT,                 -- For RSS: feed URL
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Rå emails fra nyhedsbreve
CREATE TABLE news_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES news_sources(id),
  email_id TEXT UNIQUE,         -- Gmail message ID
  subject TEXT,
  received_at TIMESTAMPTZ,
  raw_content TEXT,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Processerede nyhedsartikler
CREATE TABLE news_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id UUID REFERENCES news_emails(id),

  -- Indhold
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  original_link TEXT,

  -- Kategorisering
  category TEXT,                -- "tools", "research", "business", "policy"
  tags TEXT[],

  -- Scoring
  relevance_score DECIMAL,      -- 0-1: Relevans for danske læsere
  blog_potential_score DECIMAL, -- 0-1: Egnethed til guide
  blog_potential_reason TEXT,   -- Begrundelse for score

  -- Auto-publicering
  auto_publish BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft',  -- draft, published, archived

  -- Links
  guide_suggestion_id UUID,     -- Hvis guide er foreslået

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_news_items_published ON news_items(published_at DESC)
  WHERE status = 'published';
CREATE INDEX idx_news_items_blog_potential ON news_items(blog_potential_score DESC)
  WHERE blog_potential_score >= 0.7;
```

### 4.2 Blog-system

```sql
-- Blog drafts (AI-genererede)
CREATE TABLE blog_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_item_id UUID REFERENCES news_items(id),

  -- Indhold
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,        -- MDX content
  outline TEXT[],               -- Struktur
  target_audience TEXT,

  -- Status
  status TEXT DEFAULT 'pending_approval',
    -- pending_approval, approved, published, rejected
  task_id UUID REFERENCES tasks(id),  -- Link til godkendelsesopgave

  -- Approval
  approved_at TIMESTAMPTZ,
  approved_by UUID,
  rejection_reason TEXT,

  -- Publishing
  published_at TIMESTAMPTZ,
  mdx_file_path TEXT,           -- Path til MDX fil efter publicering

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Published blogs (mirror af MDX filer)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID REFERENCES blog_drafts(id),

  -- Indhold
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,

  -- Metadata
  tags TEXT[],
  author TEXT DEFAULT 'Andreas Lausen',
  reading_time_minutes INT,

  -- Status
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  -- Links
  related_news_id UUID REFERENCES news_items(id),

  -- Social posts
  social_posts_created BOOLEAN DEFAULT false
);
```

### 4.3 Social Media

```sql
-- Social media posts
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES blog_posts(id),

  -- Platform
  platform TEXT NOT NULL,       -- "linkedin", "facebook", "x"
  content TEXT NOT NULL,
  hashtags TEXT[],
  media_urls TEXT[],            -- Eventuelle billeder

  -- Status
  status TEXT DEFAULT 'pending_approval',
    -- pending_approval, approved, scheduled, posted, failed
  task_id UUID REFERENCES tasks(id),

  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,

  -- Platform response
  platform_post_id TEXT,        -- ID fra platformen
  platform_url TEXT,            -- Link til opslaget
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Content calendar (planlægning)
CREATE TABLE content_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Timing
  scheduled_date DATE NOT NULL,
  time_slot TEXT,               -- "morning", "afternoon", "evening"

  -- Content type
  content_type TEXT NOT NULL,   -- "news", "blog", "social"
  content_id UUID,              -- Reference til specifikt indhold

  -- Tema/topic
  topic TEXT,
  notes TEXT,

  -- Status
  status TEXT DEFAULT 'planned', -- planned, content_created, published

  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled ON social_posts(scheduled_at)
  WHERE status = 'scheduled';
CREATE INDEX idx_content_calendar_date ON content_calendar(scheduled_date);
```

---

## 5. Workflow og Godkendelse

### 5.1 Nyheds-flow (automatisk)

```
Email modtages (TLDR, etc.)
    │
    ▼
Cron job scanner (hver time)
    │
    ▼
News Extractor Agent processerer
    │
    ├─── relevance_score >= 0.6 ───▶ AUTO-PUBLICER på /nyheder
    │
    └─── relevance_score < 0.6 ───▶ Gem som draft (kan manuelt publiceres)
```

### 5.2 Blog-flow (kræver godkendelse)

```
Nyhed med blog_potential >= 0.8
    │
    ▼
Guide Writer Agent laver udkast
    │
    ▼
Opgave oprettes i AI-assistent
    │
    ▼
Andreas reviewer i task feed
    │
    ├─── [Godkend] ───▶ Publicer til /blog ───▶ Trigger social posts
    │
    ├─── [Redigér] ───▶ Chat-dialog ───▶ Opdateret udkast ───▶ Tilbage til review
    │
    └─── [Afvis] ───▶ Arkiver med begrundelse
```

### 5.3 Social-flow (kræver godkendelse)

```
Blog publiceret
    │
    ▼
Social Writer Agent laver 3 opslag
(LinkedIn, Facebook, X)
    │
    ▼
3 separate opgaver i AI-assistent
    │
    ▼
Andreas godkender hver platform
    │
    ├─── [Godkend] ───▶ Scheduler til optimal tid
    │                     │
    │                     ▼
    │                   Post automatisk (eller manuelt copy/paste)
    │
    └─── [Redigér] ───▶ Justér indhold ───▶ Godkend
```

---

## 6. Cron Jobs

### 6.1 Content Pipeline Jobs

| Job | Frekvens | Handling |
|-----|----------|----------|
| `scan-newsletters` | Hver time | Scan Gmail for nye TLDR-mails |
| `process-news` | Hver time | Kør News Extractor Agent |
| `auto-publish-news` | Hver time | Publicer nyheder med relevance >= 0.6 |
| `suggest-guides` | Dagligt kl. 8 | Find nyheder med blog_potential >= 0.8 |
| `generate-social` | Efter blog-godkendelse | Opret social posts for ny blog |
| `post-scheduled` | Hver time | Post scheduled social media content |

### 6.2 Integration med AI-assistent

Jobs defineres i AI-assistentens cron-system (`api/cron/`):

```typescript
// api/cron/content-pipeline/route.ts

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 1. Scan for nye nyhedsbreve
  const newEmails = await scanNewsletterEmails();

  // 2. Process med OpenAI Agents SDK
  for (const email of newEmails) {
    const result = await Runner.run(news_extractor_agent, {
      input: `Process newsletter email: ${email.id}`
    });

    // 3. Auto-publicer hvis høj relevans
    for (const newsItem of result.news_items) {
      if (newsItem.relevance_score >= 0.6) {
        await publishNewsItem(newsItem);
      }

      // 4. Foreslå guide hvis høj blog potential
      if (newsItem.blog_potential_score >= 0.8) {
        await createGuideSuggestion(newsItem);
      }
    }
  }

  return Response.json({ processed: newEmails.length });
}
```

---

## 7. Frontend-sider

### 7.1 Nyheder (`/nyheder`)

```
┌────────────────────────────────────────────────────────────────┐
│  AI-nyheder på dansk                                           │
│  Dagligt overblik over hvad der sker i AI-verdenen             │
│                                                                │
│  [Tools] [Research] [Business] [Policy]    [Søg...]           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  I DAG                                                         │
│  ─────                                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Claude får "computer use" – kan styre din PC             │ │
│  │                                                          │ │
│  │ Anthropic har lanceret en ny feature, der lader Claude   │ │
│  │ overtage din computer og udføre opgaver. Det åbner for   │ │
│  │ helt nye muligheder for automatisering.                  │ │
│  │                                                          │ │
│  │ #tools #claude                                           │ │
│  │                                                          │ │
│  │ [Læs mere hos Anthropic →]   [Se vores guide →]         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  I GÅR                                                         │
│  ────                                                          │
│  ...                                                           │
│                                                                │
│  [Vis flere nyheder]                                           │
└────────────────────────────────────────────────────────────────┘
```

### 7.2 Blog (`/blog`) - forbedret

```
┌────────────────────────────────────────────────────────────────┐
│  Guides og artikler                                            │
│  Praktisk viden om AI i hverdagen                              │
│                                                                │
│  [Alle] [Guides] [Artikler]                    [Søg...]       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ GUIDE · 8 min                                            │ │
│  │                                                          │ │
│  │ Sådan kommer du i gang med Claude Computer Use           │ │
│  │                                                          │ │
│  │ En praktisk guide til Anthropics nye feature, der lader  │ │
│  │ Claude styre din computer. Vi gennemgår setup, use       │ │
│  │ cases og hvad du skal være opmærksom på.                 │ │
│  │                                                          │ │
│  │ #Claude #Guide #Automatisering                           │ │
│  │                                                          │ │
│  │ Baseret på nyhed: Claude lancerer computer use           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ...                                                           │
└────────────────────────────────────────────────────────────────┘
```

---

## 8. Side-forbedringer (fra v1.0)

### 8.1 Forside

**Nuværende problemer:**
- Teksten er stadig lidt "konsulent-agtig"
- Mangler personlighed

**Foreslåede forbedringer:**
```
FRA: "phugl gør AI brugbart og trygt i hverdagen – så arbejdet
     bliver lettere. Implementering, arbejdsgange, governance
     og kvalitetssikring."

TIL: "Jeg hjælper dig med at få AI til at fungere i hverdagen.
     Uden buzzwords. Uden magic. Bare noget, der virker."
```

**Tilføj sektion:** "Seneste nyheder" med 3 nyeste fra /nyheder

### 8.2 Om-side

**Nuværende problemer:**
- Listen virker opstillet
- Mangler menneskelig touch

**Foreslåede forbedringer:**
```
FRA: "Jeg er Andreas – også kendt som phugl (med ph)."

TIL: "Hej. Jeg hedder Andreas, men de fleste kalder mig phugl
     (med ph). Det startede som et øgenavn, men i dag er det
     blevet mit brand – og min tilgang til arbejdet."
```

**Tilføj:** Billede af Andreas

### 8.3 Kontakt

**Foreslåede forbedringer:**
- Simplificér til én kolonne
- Mere uformel tekst:
```
"Det letteste er bare at skrive til mig. Jeg svarer som regel
inden for en dag. Hvis du hellere vil snakke, så ring – og
hvis jeg ikke tager den, så ring igen."
```

---

## 9. Logo-integration

**Status:** Logo er lavet, afventer upload.

**Placering:**
- Header: Logo til venstre (erstatter tekst "phugl")
- Footer: Logo i brand-sektionen
- Favicon: Logo som favicon
- Open Graph: Logo som default social image

**Teknisk:**
```typescript
// src/components/header.tsx
import Image from "next/image";

<Link href="/" className="flex items-center space-x-2">
  <Image
    src="/logo.svg"
    alt="phugl"
    width={100}
    height={32}
    priority
  />
</Link>
```

---

## 10. Implementeringsplan

### Fase 1: Grundlæggende forbedringer (uge 1)
- [ ] Upload og integrer logo
- [ ] Forbedre tekster på alle sider
- [ ] Tilføj billede af Andreas
- [ ] Opdater kontakt-side

### Fase 2: Nyheds-infrastruktur (uge 2)
- [ ] Opret database-tabeller
- [ ] Byg `/nyheder` side
- [ ] Opret API routes
- [ ] Tilføj "Seneste nyheder" på forsiden

### Fase 3: OpenAI Agents SDK setup (uge 3)
- [ ] Opret vector store i OpenAI platform
- [ ] Upload eksisterende content til FileSearch
- [ ] Implementer News Extractor Agent
- [ ] Test med TLDR-mails
- [ ] Sæt auto-publicering op

### Fase 4: Guide-system (uge 4)
- [ ] Implementer Guide Writer Agent
- [ ] Opret guide-forslag workflow
- [ ] Integrer med task feed
- [ ] Test godkendelsesflow

### Fase 5: Social media (uge 5)
- [ ] Implementer Social Writer Agent
- [ ] Opret social posts for alle platforme
- [ ] Integrer godkendelsesflow
- [ ] (Valgfrit) API-integration til automatisk posting

### Fase 6: Finpudsning (løbende)
- [ ] Optimér agent prompts
- [ ] Tilføj analytics
- [ ] RSS feed for nyheder
- [ ] Email-notifikationer for nye guides

---

## 11. Afklarede beslutninger

### Nyhedskilder
- **TLDR-nyhedsbreve**: Mange forskellige (AI, Tech, Web Dev, etc.)
- Agent scanner automatisk for emails fra `*@tldr.tech`

### Social media setup
- **LinkedIn**: Company Page (phugl)
- **Facebook**: Page (phugl)
- **X/Twitter**: TBD
- **Posting**: Semi-automatisk (kopiér tekst fra godkendt opgave, post manuelt)
- **Fremtidig**: API-integration kan tilføjes senere

### Frekvens (forslag)
- Nyheder: Maks 5 per dag
- Guides: Maks 2 per uge
- Social posts: Samme dag som blog-publicering

## 12. Åbne spørgsmål

1. **Logo:** Hvor ligger logo-filen? (Upload til /public/logo.svg)

---

## 13. Success-kriterier

**Kortsigtet (3 måneder):**
- [ ] Daglige AI-nyheder på phugl.dk/nyheder
- [ ] Mindst 4 guides publiceret
- [ ] Social media-opslag for hver guide

**Langsigtet (12 måneder):**
- [ ] 1000+ månedlige besøgende på /nyheder
- [ ] Top 10 på "AI nyheder dansk" søgninger
- [ ] 20%+ af henvendelser kommer fra content

---

*Kravspec v2.0 - Januar 2026*
*Opdateres løbende*

**Kilder:**
- [OpenAI Agents SDK Documentation](https://openai.github.io/openai-agents-python/)
- [OpenAI Agents SDK GitHub](https://github.com/openai/openai-agents-python)
- [Web Search Tool](https://platform.openai.com/docs/guides/tools-web-search)
- [File Search Tool](https://platform.openai.com/docs/guides/tools-file-search)
- [OpenAI Cookbook - Agents](https://cookbook.openai.com/topic/agents)
