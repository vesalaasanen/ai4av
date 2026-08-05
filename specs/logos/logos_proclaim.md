---
spec_id: admin/logos-proclaim
schema_version: ai4av-public-spec-v1
revision: 2
title: "Logos Proclaim Control Spec"
manufacturer: Logos
model_family: "Logos Proclaim"
aliases: []
compatible_with:
  manufacturers:
    - Logos
  models:
    - "Logos Proclaim"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.proclaim.logos.com
source_urls:
  - https://support.proclaim.logos.com/hc/en-us/articles/19864456647053-Proclaim-App-Command-API
retrieved_at: 2026-07-24T18:50:14.450Z
last_checked_at: 2026-08-05T08:32:08.534Z
generated_at: 2026-08-05T08:32:08.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device power/thermal specs not applicable (software)"
  - "no unsolicited notifications documented"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:32:08.534Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions map 1:1 to source appCommandName tokens and the two endpoints; transport values verbatim. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Logos Proclaim Control Spec

## Summary
Church presentation software control via HTTP REST API on port 52195. Supports slide navigation, audio/video playback, quick screens, on-air state, and song lyrics. Local requests exempt from auth; remote requests require password + token.

<!-- UNRESOLVED: device power/thermal specs not applicable (software) -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 52195  # stated: cannot be changed
  base_url: "http://<host>:52195"  # host = ipaddress; path appended per action
auth:
  type: token  # password -> auth token; local requests exempt
  note: "unauthenticated allowed from same machine; remote requires POST to /appCommand/authenticate"
  header: "ProclaimAuthToken"  # header carrying the token for /appCommand/perform
  exempt_paths:
    - /onair/session  # explicitly stated: no auth required
```

## Traits
```yaml
# inferred from command set
- powerable       # GoOnAir / GoOffAir present
- queryable       # /onair/session returns session id; /appCommand/perform acts as state pusher
# Note: routable and levelable are NOT supported by source evidence (no input/output routing,
# no volume/gain commands) and were removed from the prior draft.
```

## Actions
```yaml
# All actions are GET requests to /appCommand/perform unless otherwise noted.
# Authenticated remote requests must include header: ProclaimAuthToken: <token>.
# index param applies only to commands annotated with * in the source (1-254).

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  method: POST
  command: "/appCommand/authenticate"
  body:
    - name: Password
      type: string
      description: Network Control Password (default: 'proclaim')
  params: []

# --- Slide ---
- id: next_slide
  label: NextSlide
  kind: action
  command: "/appCommand/perform?appCommandName=nextSlide"
  params: []

- id: previous_slide
  label: PreviousSlide
  kind: action
  command: "/appCommand/perform?appCommandName=previousSlide"
  params: []

- id: next_service_item
  label: NextServiceItem
  kind: action
  command: "/appCommand/perform?appCommandName=nextServiceItem"
  params: []

- id: previous_service_item
  label: PreviousServiceItem
  kind: action
  command: "/appCommand/perform?appCommandName=previousServiceItem"
  params: []

- id: start_pre_service
  label: StartPreService
  kind: action
  command: "/appCommand/perform?appCommandName=startPreService"
  params: []

- id: start_warm_up
  label: StartWarmUp
  kind: action
  command: "/appCommand/perform?appCommandName=startWarmUp"
  params: []

- id: start_service
  label: StartService
  kind: action
  command: "/appCommand/perform?appCommandName=startService"
  params: []

- id: start_post_service
  label: StartPostService
  kind: action
  command: "/appCommand/perform?appCommandName=startPostService"
  params: []

- id: go_to_service_item
  label: GoToServiceItem
  kind: action
  command: "/appCommand/perform?appCommandName=goToServiceItem&index={index}"
  params:
    - name: index
      type: integer
      description: Service item index (1-254)

- id: go_to_slide
  label: GoToSlide
  kind: action
  command: "/appCommand/perform?appCommandName=goToSlide&index={index}"
  params:
    - name: index
      type: integer
      description: Slide index (1-254)

# --- Audio Video ---
- id: next_audio_item
  label: NextAudioItem
  kind: action
  command: "/appCommand/perform?appCommandName=nextAudioItem"
  params: []

- id: previous_audio_item
  label: PreviousPreviousAudioItem
  kind: action
  command: "/appCommand/perform?appCommandName=previousAudioItem"
  params: []

- id: video_restart
  label: VideoRestart
  kind: action
  command: "/appCommand/perform?appCommandName=videoRestart"
  params: []

- id: video_rewind
  label: VideoRewind
  kind: action
  command: "/appCommand/perform?appCommandName=videoRewind"
  params: []

- id: video_fast_forward
  label: VideoFastForward
  kind: action
  command: "/appCommand/perform?appCommandName=videoFastForward"
  params: []

- id: video_play
  label: VideoPlay
  kind: action
  command: "/appCommand/perform?appCommandName=videoPlay"
  params: []

- id: video_pause
  label: VideoPause
  kind: action
  command: "/appCommand/perform?appCommandName=videoPause"
  params: []

# --- QuickScreens ---
- id: show_blank_quick_screen
  label: ShowBlankQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showBlankQuickScreen"
  params: []

- id: show_logo_quick_screen
  label: ShowLogoQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showLogoQuickScreen"
  params: []

- id: show_no_text_quick_screen
  label: ShowNoTextQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showNoTextQuickScreen"
  params: []

- id: show_floating_hearts_quick_screen
  label: ShowFloatingHeartsQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showFloatingHeartsQuickScreen"
  params: []

- id: show_floating_amens_quick_screen
  label: ShowFloatingAmensQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showFloatingAmensQuickScreen"
  params: []

- id: show_amen_quick_screen
  label: ShowAmenQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showAmenQuickScreen"
  params: []

- id: show_hallelujah_quick_screen
  label: ShowHallelujahQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showHallelujahQuickScreen"
  params: []

- id: show_praise_the_lord_quick_screen
  label: ShowPraiseTheLordQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showPraiseTheLordQuickScreen"
  params: []

- id: show_he_is_risen_quick_screen
  label: ShowHeIsRisenQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showHeIsRisenQuickScreen"
  params: []

- id: show_he_is_risen_white_quick_screen
  label: ShowHeIsRisenWhiteQuickScreen
  kind: action
  command: "/appCommand/perform?appCommandName=showHeIsRisenWhiteQuickScreen"
  params: []

# --- On/Off Air ---
- id: go_on_air
  label: GoOnAir
  kind: action
  command: "/appCommand/perform?appCommandName=goOnAir"
  params: []

- id: go_off_air
  label: GoOffAir
  kind: action
  command: "/appCommand/perform?appCommandName=goOffAir"
  params: []

# --- Song Commands ---
- id: show_song_lyrics_verse_by_index
  label: ShowSongLyricsVerseByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsVerseByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Verse number (1-254)

- id: show_song_lyrics_bridge_by_index
  label: ShowSongLyricsBridgeByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsBridgeByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Bridge index (1-254)

- id: show_song_lyrics_chorus_by_index
  label: ShowSongLyricsChorusByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsChorusByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Chorus index (1-254)

- id: show_song_lyrics_pre_chorus_by_index
  label: ShowSongLyricsPreChorusByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsPreChorusByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Pre-chorus index (1-254)

- id: show_song_lyrics_ending_by_index
  label: ShowSongLyricsEndingByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsEndingByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Ending index (1-254)

- id: show_song_lyrics_interlude_by_index
  label: ShowSongLyricsInterludeByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsInterludeByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Interlude index (1-254)

- id: show_song_lyrics_tag_by_index
  label: ShowSongLyricsTagByIndex
  kind: action
  command: "/appCommand/perform?appCommandName=showSongLyricsTagByIndex&index={index}"
  params:
    - name: index
      type: integer
      description: Tag index (1-254)

# --- On-Air Session Query ---
- id: onair_session
  label: GetOnAirSession
  kind: query
  command: "/onair/session"
  auth_required: false  # source: "This route does not require any authentication."
  params: []
```

## Feedbacks
```yaml
# /onair/session -- returns session id if on air, empty if not
- id: onair_session
  label: OnAir Session
  type: string
  description: Returns session id string if Proclaim is On Air, empty body if not. Session id stable for On Air duration; changes on re-on-air.

# Auth token response (from /appCommand/authenticate POST)
- id: auth_response
  label: Auth Response
  type: object
  description: Returns {"proclaimAuthToken":"<token>"} on successful authentication. The token is opaque and used in the ProclaimAuthToken header for subsequent /appCommand/perform requests.
```

## Variables
```yaml
# No standalone settable parameters found; all control via actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: password sent as plain text over network -- do not use important password
```

## Notes
- Port 52195 fixed; cannot be changed per vendor documentation.
- Password defaults to 'proclaim'; changeable in Proclaim > Settings > Remote > Network Control Password.
- Auth token must be included in `ProclaimAuthToken` header for all `/appCommand/perform` requests from remote machines.
- `/appCommand/authenticate` (POST) and `/onair/session` (GET) are exempt from token auth.
- `/onair/session` returns an empty body when Proclaim is Off Air; non-empty session id when On Air.
- App command names are case-insensitive per vendor documentation.
- Index range for annotated commands: 1-254 (per source: "index is expected to be a value between 1 - 254").
- For Chorus/Bridge/etc. with un-indexed values, omit the index parameter.
- `previousAudioItem` command name is documented verbatim in source as `PreviousPreviousAudioItem` (vendor typo); preserved in the `previous_audio_item` action's label.

## Provenance

```yaml
source_domains:
  - support.proclaim.logos.com
source_urls:
  - https://support.proclaim.logos.com/hc/en-us/articles/19864456647053-Proclaim-App-Command-API
retrieved_at: 2026-07-24T18:50:14.450Z
last_checked_at: 2026-08-05T08:32:08.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:32:08.534Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions map 1:1 to source appCommandName tokens and the two endpoints; transport values verbatim. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device power/thermal specs not applicable (software)"
- "no unsolicited notifications documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
