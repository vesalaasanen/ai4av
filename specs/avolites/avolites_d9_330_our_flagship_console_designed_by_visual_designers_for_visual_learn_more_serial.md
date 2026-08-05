---
spec_id: admin/avolites-d9-330
schema_version: ai4av-public-spec-v1
revision: 1
title: "Avolites D9-330 Control Spec"
manufacturer: Avolites
model_family: D9-330
aliases: []
compatible_with:
  manufacturers:
    - Avolites
  models:
    - D9-330
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.avolites.com
source_urls:
  - https://api.avolites.com/19.2/
  - https://api.avolites.com/
retrieved_at: 2026-07-14T06:34:23.784Z
last_checked_at: 2026-07-21T20:25:43.525Z
generated_at: 2026-07-21T20:25:43.525Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the general Titan web API and never names the D9-330 model explicitly; coverage assumed applicable to D9-330 as a Titan console."
  - "the source file is named \"..._serial.refined.md\" and the supplied known-protocol hint is RS-232C, but the refined source text describes only an HTTP web API on port 4430. No RS-232/serial command syntax is present in the source; serial transport is therefore not populated."
  - "exact error-message format not fully specified in source"
  - "no unsolicited notification / push mechanism described in source."
  - "no multi-step sequences explicitly described in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "model name \"D9-330\" not explicitly stated in source; source describes the generic Avolites/Titan web API applicable to Titan consoles."
  - "complete provider/command catalogue not included in source — only Playbacks, Masters, and Titan providers partially documented. Full list at external URL api.avolites.com."
  - "no RS-232/serial command syntax present despite source filename and protocol hint."
  - "firmware / Titan version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:25:43.525Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions have literal HTTP command evidence in source excerpt; port 4430 and /titan/ base path verified; no auth required confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Avolites D9-330 Control Spec

## Summary
The Avolites D9-330 is a flagship lighting console running the Titan software. This spec covers the Avolites/Titan HTTP web API, which exposes Get/Set property commands, Script method calls, and Handle requests for reading console state. The API communicates over HTTP using JSON-formatted responses.

<!-- UNRESOLVED: source documents the general Titan web API and never names the D9-330 model explicitly; coverage assumed applicable to D9-330 as a Titan console. -->
<!-- UNRESOLVED: the source file is named "..._serial.refined.md" and the supplied known-protocol hint is RS-232C, but the refined source text describes only an HTTP web API on port 4430. No RS-232/serial command syntax is present in the source; serial transport is therefore not populated. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 4430
  base_url: /titan/
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable       (Get commands and Handle requests return values)
# - levelable       (SetMasterLevel, FirePlaybackAtLevel accept level)
traits:
  - queryable  # inferred from Get and Handle request examples
  - levelable  # inferred from level/setLevel command examples
```

## Actions
```yaml
actions:
  - id: get_property
    label: Get Property Value
    kind: query
    command: "GET /titan/get/{propertyPath}"
    params:
      - name: propertyPath
        type: string
        description: Case-sensitive dot/slash path of the property to read (e.g. System/SoftwareVersion, Show/ShowName, Titan/DeviceInfo)
    notes: "Example: http://{host}:4430/titan/get/System/SoftwareVersion returns e.g. \"14.0\""

  - id: set_property
    label: Set Property Value
    kind: action
    command: "POST /titan/set/{propertyPath}"
    params:
      - name: propertyPath
        type: string
        description: Case-sensitive property path to set (e.g. Fixtures/ShowDmxAddress)
      - name: value
        type: string
        description: Value to assign, sent in the POST body (e.g. True/False)
    notes: "Example POST body sets Fixtures/ShowDmxAddress to False"

  - id: script_process
    label: Script - Playbacks Select Process
    kind: action
    command: "GET /titan/script/Playbacks/Select/Process?string={string}&int={int}"
    params:
      - name: string
        type: string
        description: String parameter passed to the Process script
      - name: int
        type: integer
        description: Integer parameter passed to the Process script
    notes: "Fires an event based on the supplied string and integer"

  - id: script_set_master_level
    label: Script - Masters SetMasterLevel
    kind: action
    command: "GET /titan/script/Masters/SetMasterLevel?string={playback}&int={index}&level={level}&float={float}&bool={bool}"
    params:
      - name: playback
        type: string
        description: Playback identifier string
      - name: index
        type: integer
        description: Master index
      - name: level
        type: number
        description: Target level (0.5 = 50%, 1.0 = 100%); mutually exclusive with levelDelta
      - name: float
        type: number
        description: Float parameter (example uses 1.0)
      - name: bool
        type: boolean
        description: Boolean parameter
    notes: "Supports level (absolute) or levelDelta (relative add) variants"

  - id: script_fire_playback_at_level
    label: Script - Playbacks FirePlaybackAtLevel
    kind: action
    command: "GET /titan/script/Playbacks/FirePlaybackAtLevel?{idParam}={id}&level={level}&bool={refire}"
    params:
      - name: idParam
        type: string
        description: Identifier type, either titanId or userNumber
      - name: id
        type: integer
        description: titanId or userNumber of the playback
      - name: level
        type: number
        description: Level to fire at (0.5 = 50%, 1.0 = 100%)
      - name: refire
        type: boolean
        description: If true, kills the playback before firing
    notes: "Forces playback to a level; loads it if not loaded. Void return."

  - id: script_kill_playback
    label: Script - Playbacks KillPlayback
    kind: action
    command: "GET /titan/script/Playbacks/KillPlayback?{idParam}={id}"
    params:
      - name: idParam
        type: string
        description: Identifier type, either titanId or userNumber
      - name: id
        type: integer
        description: titanId or userNumber of the playback to kill
    notes: "Kills the specified playback. Void return."

  - id: script_toggle_latch_playback
    label: Script - Playbacks ToggleLatchPlayback
    kind: action
    command: "GET /titan/script/Playbacks/ToggleLatchPlayback?{idParam}={id}"
    params:
      - name: idParam
        type: string
        description: Identifier type, either titanId or userNumber
      - name: id
        type: integer
        description: titanId or userNumber of the playback to toggle
    notes: "Displays the contents of a cue; for a cue list moves on to the next cue and displays it. Void return."

  - id: script_kill_all_playbacks
    label: Script - Playbacks KillAllPlaybacks
    kind: action
    command: "GET /titan/script/Playbacks/KillAllPlaybacks"
    params: []
    notes: "Deactivates all playbacks. No parameters. Void return."

  - id: get_page_handles
    label: Get Page Handles
    kind: query
    command: "GET /titan/handles/{group}/{pageIndex}"
    params:
      - name: group
        type: string
        description: Group name; capitalisation must match the console (e.g. Colours, Fixtures)
      - name: pageIndex
        type: integer
        description: Page index, starting at 0
    notes: "Returns all handles on the specified page of a group, JSON array"

  - id: get_group_handles
    label: Get Group Handles
    kind: query
    command: "GET /titan/handles/{group}"
    params:
      - name: group
        type: string
        description: Group name; capitalisation must match the console (e.g. Fixtures)
    notes: "Returns handles from all pages of the specified group, JSON array"

  - id: get_all_handles
    label: Get All Handles
    kind: query
    command: "GET /titan/handles"
    params: []
    notes: "Returns every programmed handle on the console across all groups. Response can be very large."

  - id: get_titan_device_info
    label: Get Titan DeviceInfo
    kind: query
    command: "GET /titan/get/Titan/DeviceInfo"
    params: []
    notes: "Returns the status of all connections to the console in JSON format (property of the Titan provider)"
```

## Feedbacks
```yaml
feedbacks:
  - id: get_response_value
    type: string
    description: Plain-value response from a Get property request (e.g. Titan version, show name)
  - id: handle_json
    type: object
    description: JSON array of handle objects returned by handle requests. Each item contains handleLocation {group,index,page}, properties [{Key,Value}], titanId, type, Active, Legend
  - id: device_info
    type: object
    description: JSON describing all connection types/status of the console (Titan/DeviceInfo)
  - id: script_result
    type: string
    description: For successful Script requests the console returns the result, or a blank page if there is no result. Invalid requests return an error message
# UNRESOLVED: exact error-message format not fully specified in source
```

## Variables
```yaml
variables:
  - id: system_software_version
    type: string
    description: Titan software version (read via System/SoftwareVersion)
  - id: show_name
    type: string
    description: Current show name (read via Show/ShowName)
  - id: show_dmx_address
    type: boolean
    description: Whether DMX address is shown on fixture buttons (set via Fixtures/ShowDmxAddress)
  - id: master_level
    type: number
    description: Master level (0.0-1.0), set/read via Masters/SetMasterLevel
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / push mechanism described in source.
# All responses are synchronous replies to HTTP Get/Script/Handle requests.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Do not infer.
```

## Notes
- The API uses HTTP port 4430 on all requests. All paths begin with `/titan/`.
- Get requests use HTTP GET and can be issued from a browser address bar for testing.
- Set requests use HTTP POST with the value in the message body; not testable from a plain browser address bar.
- Script requests use HTTP GET with query parameters. Parameters are type-tagged (`string=`, `int=`, `float=`, `bool=`, `level=`, `levelDelta=`, `titanId=`, `userNumber=`). Parameter type names are case-sensitive.
- Identifiers: `titanId` is a system-generated unique id (obtainable via Handle requests); `userNumber` is an assignable number. Either may be used where an Id is required.
- A full function listing is referenced at `https://api.avolites.com/19.2/api` — not captured in this source excerpt.
- Titan-specific parameter types documented: `Level` (absolute value), `Level Delta` (relative add), `TitanId`, `User Number`, plus basic Boolean/float/integer/string.
- Console example IP used throughout the source is `10.0.0.1`.

<!-- UNRESOLVED: model name "D9-330" not explicitly stated in source; source describes the generic Avolites/Titan web API applicable to Titan consoles. -->
<!-- UNRESOLVED: complete provider/command catalogue not included in source — only Playbacks, Masters, and Titan providers partially documented. Full list at external URL api.avolites.com. -->
<!-- UNRESOLVED: no RS-232/serial command syntax present despite source filename and protocol hint. -->
<!-- UNRESOLVED: firmware / Titan version compatibility range not stated. -->
````

## Provenance

```yaml
source_domains:
  - api.avolites.com
source_urls:
  - https://api.avolites.com/19.2/
  - https://api.avolites.com/
retrieved_at: 2026-07-14T06:34:23.784Z
last_checked_at: 2026-07-21T20:25:43.525Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:25:43.525Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions have literal HTTP command evidence in source excerpt; port 4430 and /titan/ base path verified; no auth required confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the general Titan web API and never names the D9-330 model explicitly; coverage assumed applicable to D9-330 as a Titan console."
- "the source file is named \"..._serial.refined.md\" and the supplied known-protocol hint is RS-232C, but the refined source text describes only an HTTP web API on port 4430. No RS-232/serial command syntax is present in the source; serial transport is therefore not populated."
- "exact error-message format not fully specified in source"
- "no unsolicited notification / push mechanism described in source."
- "no multi-step sequences explicitly described in source"
- "source contains no safety warnings, interlock procedures, or"
- "model name \"D9-330\" not explicitly stated in source; source describes the generic Avolites/Titan web API applicable to Titan consoles."
- "complete provider/command catalogue not included in source — only Playbacks, Masters, and Titan providers partially documented. Full list at external URL api.avolites.com."
- "no RS-232/serial command syntax present despite source filename and protocol hint."
- "firmware / Titan version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
