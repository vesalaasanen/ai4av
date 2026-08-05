---
spec_id: admin/agath-me3_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "AGATH ME3 Series Control Spec"
manufacturer: AGATH
model_family: "AGATH Television ME3 Series"
aliases: []
compatible_with:
  manufacturers:
    - AGATH
  models:
    - "AGATH Television ME3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - priv.agath.com
source_urls:
  - https://priv.agath.com/wp-content/uploads/2018/11/ME3463-RS232-Operating-Instructions.pdf
retrieved_at: 2026-04-29T12:02:42.663Z
last_checked_at: 2026-07-12T08:41:03.832Z
generated_at: 2026-07-12T08:41:03.832Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP/TCP control variant documented in this source"
  - "no discrete queryable variables beyond power/input state documented"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "IP/TCP control variant not in source despite filename suggestion"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:41:03.832Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched literally; transport parameters verified; 1:1 coverage at spec granularity. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# AGATH ME3 Series Control Spec

## Summary
AGATH Television ME3 Series (model ME3463) media display. RS-232 control via RJ-45 connection at 9600 bps 8N1. Commands sent as ASCII strings with format `[cmd1] [cmd2] [data][CR]`; device acknowledges with `[cmd2] 01 OK[data]x`.

<!-- UNRESOLVED: no IP/TCP control variant documented in this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: power on/off commands (ka)
- routable     # inferred: input select commands (kb)
- levelable    # inferred: volume control commands (kf)
- queryable    # inferred: power status & power mode status queries (ka ff, kq ff)
```

## Actions
```yaml
# ── Power (ka) ──
- id: power_on
  label: Power On
  kind: action
  command: "ka 00 01"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "ka 00 00"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "ka 00 ff"
  params: []

# ── Input select (kb) ──
- id: select_input
  label: Select Input
  kind: action
  command: "kb 00 {data}"
  params:
    - name: data
      type: string
      description: >
        Input source data byte - DTV=0b, ATV=0a, CDTV=0c, USB=0e,
        Composant=05, HDMI1=07, HDMI2=08, HDMI3=09, RGB=06

# ── Screen mute (kd) ──
- id: screen_mute_on
  label: Screen Mute On
  kind: action
  command: "kd 00 01"
  params: []
- id: screen_mute_off
  label: Screen Mute Off
  kind: action
  command: "kd 00 00"
  params: []

# ── Volume mute (ke) ──
# NOTE: source labels "Volume mute on (Volume off)" = ke 00 00,
# "Volume mute off (Volume on)" = ke 00 01
- id: volume_mute_on
  label: Volume Mute On
  kind: action
  command: "ke 00 00"
  params: []
- id: volume_mute_off
  label: Volume Mute Off
  kind: action
  command: "ke 00 01"
  params: []

# ── Volume control (kf) - data in decimal ──
- id: set_volume
  label: Set Volume
  kind: action
  command: "kf 00 {level}d"
  params:
    - name: level
      type: integer
      description: Volume level in decimal (0-100). Documented steps: 25, 50, 75.

# ── Power mode (kq) - TV status after power cut ──
- id: set_power_mode
  label: Set Power Mode
  kind: action
  command: "kq 00 {mode}"
  params:
    - name: mode
      type: string
      description: Power mode data byte - off=00, on=01, power_save=02
- id: power_mode_status_query
  label: Power Mode Status Query
  kind: query
  command: "kq 00 ff"
  params: []

# ── Key / IR remote commands (mc) ──
- id: key_command
  label: Key Command
  kind: action
  command: "mc 00 {key}"
  params:
    - name: key
      type: string
      description: >
        IR remote key data byte - POWER ON/OFF=11, MUTE=13, SOURCE=4f,
        MENU=43, Pr+=47, Pr-=4b, Vol+/MENU+=53, Vol-/MENU-=57, EXIT=50,
        ENTER=04, PIC SIZE=03, PIC MODE=0b, Sleep=0a, AUDIO=56,
        Sound Mode=5a, 1=1d, 2=1c, 3=46, 4=15, 5=14, 6=45, 7=00,
        8=1f, 9=1b, 0=1e, USB=61, Composant=4d, ATV=58, DTV=5c,
        HDMI 1=54, Red=51, Green=52, Yellow=49, Blue=59, EPG=20,
        INFO=06, LIST=4a, Favorite=08, VGA=5e, SCART=1a, Timeshift=6e,
        Next=68, Play/Pause=63, Fast Forward=66, Previous=69, Rewind=67,
        Prev Channel=21, Stop=64, Left=6a, Right=6b, Up=6c, Down=6d,
        SUB.T=23, REC=62, DLNA=78, PVR List=72
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - on
    - off
- id: power_mode_state
  label: Power Mode State
  type: enum
  values:
    - off
    - on
    - power_save
- id: input_state
  label: Input State
  type: string
- id: volume_state
  label: Volume State
  type: integer
- id: mute_state
  label: Mute State
  type: enum
  values:
    - on
    - off
- id: screen_mute_state
  label: Screen Mute State
  type: enum
  values:
    - on
    - off
- id: acknowledgement
  label: Command Acknowledgement
  type: string
  description: >
    Format: [cmd2] 01 OK[data]x - e.g. power on ack "a 01 OK01x".
    Terminated with lowercase 'x'. Some volume acks show "0K" (zero-K)
    in source, likely typo for "OK".
```

## Variables
```yaml
# All settable parameters exposed via actions; no separate variable namespace needed.
# UNRESOLVED: no discrete queryable variables beyond power/input state documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[COMMAND_1] [SPACE] [COMMAND_2] [SPACE] [DATA_2_BYTES] [CR]`
Acknowledgement format: `[COMMAND_2] [SPACE] 01 [SPACE] OK [DATA_2_BYTES] x`
DATA parameters are 2 bytes (padded with leading zero). Volume step uses decimal (e.g., 25d = 25 decimal, not hex).

RJ-45 wiring (female): Pin 1 = N/C, Pin 2 = N/C, Pin 3 = Tx, Pin 4 = Rx, Pin 5 = Gnd, Pin 6 = IR command (AMINO 140H), Pin 7 = IR command (Amino/Acentic/Locatel), Pin 8 = N/C.

Commands are ASCII, terminated with CR. Acknowledgements terminated with lowercase 'x'.

<!-- UNRESOLVED: IP/TCP control variant not in source despite filename suggestion -->
````

Key changes vs on-disk:
- Added verbatim `command:` to ALL 11 existing actions
- Added `power_mode_status_query` (`kq 00 ff`)
- Fixed `power_status_query` kind → `query`
- Enriched all params with source-documented data byte codes
- Added RJ-45 wiring pinout to Notes
- No TCP/IP transport — source is RS232 only despite filename

## Provenance

```yaml
source_domains:
  - priv.agath.com
source_urls:
  - https://priv.agath.com/wp-content/uploads/2018/11/ME3463-RS232-Operating-Instructions.pdf
retrieved_at: 2026-04-29T12:02:42.663Z
last_checked_at: 2026-07-12T08:41:03.832Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:41:03.832Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched literally; transport parameters verified; 1:1 coverage at spec granularity. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP/TCP control variant documented in this source"
- "no discrete queryable variables beyond power/input state documented"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "IP/TCP control variant not in source despite filename suggestion"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
