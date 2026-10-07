---
spec_id: admin/jvc-hd-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "JVC HD-56FH96 / HD-61FH96 / HD-70FH96 / HD-61FH97 / HD-70FH97 RS-232C Control Spec"
manufacturer: JVC
model_family: HD-56FH96
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - HD-56FH96
    - HD-61FH96
    - HD-70FH96
    - HD-61FH97
    - HD-70FH97
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/custrel/television/RS-232Cver13.pdf
retrieved_at: 2026-07-24T18:36:05.682Z
last_checked_at: 2026-10-07T10:37:05.109Z
generated_at: 2026-10-07T10:37:05.109Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source does not list those models, and these repairs do not establish support for them. Source doc explicitly states D-SUB 9 pin male, asynchronous ASCII, 19200 bps, 8/Odd/1, no flow control. Frame = header (1) + Unit ID (2) + Command (2) + Data[n] + terminator 0x0A. Authentication requirements are UNRESOLVED; the source provides no authentication procedure."
  - "firmware version range; model-specific availability of the listed i.Link input; detailed toggle behavior beyond the source descriptions."
  - "state queries and NULL response behavior are not documented."
  - "meaning and encoding of any second data byte.\""
  - "accepted numerical volume range.\""
  - "applicability of these settings to the table's FK subcommand because the parameter section names FH.\""
  - "section 3.10 conflicts internally. The mandatory subcommand"
  - "ACK payload structure not stated in source."
  - "NAK payload structure not stated in source."
  - "query syntax (e.g. \"PW?\") for retrieving device state"
  - "accepted numerical volume range and padding rules."
  - "exact sub-channel encoding and accepted channel range."
  - "unsolicited notifications not documented in source."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing"
  - "detailed toggle behavior beyond these descriptions."
  - "accepted numerical range and padding rules;"
  - "model-specific availability; no regional exclusion is documented."
  - "the source table gives"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:37:05.109Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 actions match source opcodes and parameters and transport values are supported; setup_front_key_enable matches semantically (spec leaves its FK/FH conflict UNRESOLVED). (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# JVC HD-56FH96 / HD-61FH96 / HD-70FH96 / HD-61FH97 / HD-70FH97 RS-232C Control Spec

## Summary
RS-232C external serial control documented for the North American JVC HD-56FH96, HD-61FH96 and HD-70FH96 rear-projection HDTV models. Applicability to HD-61FH97 and HD-70FH97 is UNRESOLVED: the source does not list those models, and these repairs do not establish support for them. Source doc explicitly states D-SUB 9 pin male, asynchronous ASCII, 19200 bps, 8/Odd/1, no flow control. Frame = header (1) + Unit ID (2) + Command (2) + Data[n] + terminator 0x0A. Authentication requirements are UNRESOLVED; the source provides no authentication procedure.

<!-- UNRESOLVED: firmware version range; model-specific availability of the listed i.Link input; detailed toggle behavior beyond the source descriptions. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
  interface: RS-232C
  connector: D-SUB 9-pin male
  communication_code: ASCII
auth:
  type: UNRESOLVED  # Authentication requirements are not stated in source.
```

## Frame Format
```yaml
header:
  value: 0x21
  ascii: "!"
unit_id:
  machine_code: 0x82
  individual_code: 0x80  # settable via SU/IC subcommand
command: 2 bytes; ASCII mnemonic except NULL (0x00 0x00)
data: 0..n bytes
terminator: 0x0A  # LineFeed, fixed
```

## Traits
```yaml
- powerable       # PW command
- routable        # IP input switching
- levelable       # VL volume, VS video status, AS aspect
- queryable       # UNRESOLVED: state queries and NULL response behavior are not documented.
```

## Actions
```yaml
- id: null_command
  label: NULL command
  kind: action
  command: "0x21 0x82 0x80 0x00 0x00 0x0A"
  params: []
  notes: No parameters.

- id: power_set
  label: Power source set
  kind: action
  command: "0x21 0x82 0x80 0x50 0x57 {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31", "0x2B", "0x2D"]
      description: "0x30=OFF, 0x31=ON, 0x2B/0x2D=toggle"

- id: power_on
  label: Power ON
  kind: action
  command: "0x21 0x82 0x80 0x50 0x57 0x31 0x0A"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "0x21 0x82 0x80 0x50 0x57 0x30 0x0A"
  params: []

- id: power_toggle
  label: Power toggle
  kind: action
  command: "0x21 0x82 0x80 0x50 0x57 0x2B 0x0A"
  params: []

- id: input_set
  label: Input switching
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31", "0x32", "0x33", "0x34", "0x35", "0x36", "0x37", "0x2B", "0x2D"]
      description: "0x30=TV, 0x31=VIDEO1, 0x32=VIDEO2, 0x33=VIDEO3, 0x34=VIDEO4, 0x35=DIGITAL-1, 0x36=DIGITAL-2, 0x37=i.Link, 0x2B=input+toggle switching, 0x2D=input-toggle switching"
  notes: "Source states data length 1 or 2 but defines only Data 0. UNRESOLVED: meaning and encoding of any second data byte."

- id: input_tv
  label: Select TV input
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x30 0x0A"
  params: []

- id: input_video1
  label: Select VIDEO1
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x31 0x0A"
  params: []

- id: input_video2
  label: Select VIDEO2
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x32 0x0A"
  params: []

- id: input_video3
  label: Select VIDEO3
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x33 0x0A"
  params: []

- id: input_video4
  label: Select VIDEO4
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x34 0x0A"
  params: []

- id: input_digital1
  label: Select DIGITAL-1
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x35 0x0A"
  params: []

- id: input_digital2
  label: Select DIGITAL-2
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x36 0x0A"
  params: []

- id: input_ilink
  label: Select i.Link
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x37 0x0A"
  params: []

- id: input_toggle
  label: Input toggle
  kind: action
  command: "0x21 0x82 0x80 0x49 0x50 0x2B 0x0A"
  params: []

- id: volume_set
  label: Sound volume set
  kind: action
  command: "0x21 0x82 0x80 0x56 0x4C {data} 0x0A"
  params:
    - name: data
      type: string
      description: "0x30-0x39 = ASCII digits for direct numerical volume setting; 0x2B = UP; 0x2D = DOWN. Data length 1 or 2. UNRESOLVED: accepted numerical volume range."

- id: volume_up
  label: Volume UP
  kind: action
  command: "0x21 0x82 0x80 0x56 0x4C 0x2B 0x0A"
  params: []

- id: volume_down
  label: Volume DOWN
  kind: action
  command: "0x21 0x82 0x80 0x56 0x4C 0x2D 0x0A"
  params: []

- id: audio_mute_set
  label: Audio muting set
  kind: action
  command: "0x21 0x82 0x80 0x41 0x4D {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31", "0x2B", "0x2D"]
      description: "0x30=MUTE OFF, 0x31=MUTE ON, 0x2B/0x2D=toggle"

- id: audio_mute_on
  label: Audio MUTE ON
  kind: action
  command: "0x21 0x82 0x80 0x41 0x4D 0x31 0x0A"
  params: []

- id: audio_mute_off
  label: Audio MUTE OFF
  kind: action
  command: "0x21 0x82 0x80 0x41 0x4D 0x30 0x0A"
  params: []

- id: audio_mute_toggle
  label: Audio MUTE toggle
  kind: action
  command: "0x21 0x82 0x80 0x41 0x4D 0x2B 0x0A"
  params: []

- id: channel_set
  label: Channel select
  kind: action
  command: "0x21 0x82 0x80 0x43 0x48 {data} 0x0A"
  params:
    - name: data
      type: string
      description: "0x30-0x39 = ASCII digits for direct decimal channel specification (data length 1-7); 0x2B = CH UP; 0x2D = CH DOWN/sub channel"

- id: channel_up
  label: Channel UP
  kind: action
  command: "0x21 0x82 0x80 0x43 0x48 0x2B 0x0A"
  params: []

- id: channel_down
  label: Channel DOWN
  kind: action
  command: "0x21 0x82 0x80 0x43 0x48 0x2D 0x0A"
  params: []

- id: video_status_set
  label: Video status set
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31", "0x32", "0x33", "0x2B", "0x2D"]
      description: "0x30=Standard, 0x31=Dynamic, 0x32=Theater, 0x33=Game, 0x2B/0x2D=toggle"

- id: video_status_standard
  label: Video status Standard
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 0x30 0x0A"
  params: []

- id: video_status_dynamic
  label: Video status Dynamic
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 0x31 0x0A"
  params: []

- id: video_status_theater
  label: Video status Theater
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 0x32 0x0A"
  params: []

- id: video_status_game
  label: Video status Game
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 0x33 0x0A"
  params: []

- id: video_status_toggle
  label: Video status toggle
  kind: action
  command: "0x21 0x82 0x80 0x56 0x53 0x2B 0x0A"
  params: []

- id: aspect_set
  label: Aspect set
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31", "0x32", "0x33", "0x2B", "0x2D"]
      description: "0x30=PANORAMA/P.ZOOM, 0x31=CINEMA/C.ZOOM, 0x32=FULL, 0x33=REGULAR/SLIM, 0x2B/0x2D=toggle"

- id: aspect_panorama
  label: Aspect PANORAMA / P.ZOOM
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 0x30 0x0A"
  params: []

- id: aspect_cinema
  label: Aspect CINEMA / C.ZOOM
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 0x31 0x0A"
  params: []

- id: aspect_full
  label: Aspect FULL
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 0x32 0x0A"
  params: []

- id: aspect_regular
  label: Aspect REGULAR / SLIM
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 0x33 0x0A"
  params: []

- id: aspect_toggle
  label: Aspect toggle
  kind: action
  command: "0x21 0x82 0x80 0x41 0x53 0x2B 0x0A"
  params: []

- id: remote_passthrough
  label: Remote control code pass-through
  kind: action
  command: "0x21 0x82 0x80 0x52 0x43 {d0} {d1} {d2} {d3} 0x0A"
  params:
    - name: d0
      type: string
      description: "0x30-0x39 or 0x41-0x46 (4 nibbles total)"
    - name: d1
      type: string
      description: "0x30-0x39 or 0x41-0x46"
    - name: d2
      type: string
      description: "0x30-0x39 or 0x41-0x46"
    - name: d3
      type: string
      description: "0x30-0x39 or 0x41-0x46"
  notes: Data length 4; each byte is 0-9 or A-F.

- id: setup_individual_code
  label: Setup - Individual code
  kind: action
  command: "0x21 0x82 0x80 0x53 0x55 0x49 0x43 {code} 0x0A"
  params:
    - name: code
      type: string
      description: "0x80-0xFF. Default 0x80. Last memory: yes."

- id: setup_remote_control_enable
  label: Setup - Remote control operation enable
  kind: action
  command: "0x21 0x82 0x80 0x53 0x55 0x52 0x4D {data} 0x0A"
  params:
    - name: data
      type: string
      values: ["0x30", "0x31"]
      description: "0x30=Disable, 0x31=Enable. Last memory: no."

- id: setup_front_key_enable
  label: Setup - Front key operation enable
  kind: action
  command: UNRESOLVED
  params:
    - name: data
      type: string
      values: ["0x30", "0x31"]
      description: "0x30=Disable, 0x31=Enable in the parameter section. Data length 1. UNRESOLVED: applicability of these settings to the table's FK subcommand because the parameter section names FH."
  notes: |
    UNRESOLVED: section 3.10 conflicts internally. The mandatory subcommand
    table identifies front-key operation as 0x46 0x4B ('F', 'K'), with last
    memory 'no'. Its parameter section instead identifies 0x46 0x48
    ('F', 'H') and lists 0x30=Disable and 0x31=Enable.
    The enclosing setup command is 0x53 0x55 ('S', 'U'), followed by a
    two-byte subcommand and setting. Neither conflicting front-key
    subcommand is selected as an executable command pending clarification.
```

## Feedbacks
```yaml
# Source documents three header values but does not specify
# the body of ACK/NAK responses or which commands elicit them.
# Capture the header taxonomy explicitly; mark body as unresolved.
- id: response_ack
  type: enum
  values: [ack]
  description: |
    Response header 0x06 (ACK). Source does not document body structure
    or which commands trigger an ACK response.
  notes: |
    # UNRESOLVED: ACK payload structure not stated in source.

- id: response_nak
  type: enum
  values: [nak]
  description: |
    Response header 0x15 (NAK). Source does not document body structure,
    error codes, or which commands trigger a NAK response.
  notes: |
    # UNRESOLVED: NAK payload structure not stated in source.

- id: response_headers
  type: enum
  values: [operation, ack, nak]
  description: |
    Source-defined header table (section 2.3): Operation (0x21),
    ACK (0x06), and NAK (0x15). Operation is the operation-command header.
  notes: |
    # UNRESOLVED: query syntax (e.g. "PW?") for retrieving device state
    # is not documented in source; no status-query mechanism or mapping
    # of commands to ACK/NAK responses is specified.
```

## Variables
```yaml
# VL documents direct numerical volume setting using ASCII digits,
# with data length 1 or 2; it is represented by volume_set above.
# UNRESOLVED: accepted numerical volume range and padding rules.
# CH documents direct decimal channel specification with data length
# 1-7; it is represented by channel_set above.
# UNRESOLVED: exact sub-channel encoding and accepted channel range.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing
# requirements stated in source.
```

## Notes
- Source filename `lt-fh_hd-fh_series.pdf` (Crestron-hosted). The doc is JVC-issued
  per Crestron Application Market conventions, but first-party URL not confirmed.
  Marked `declared_confidence: low` accordingly.
- The supplied source explicitly lists only North American HD-70FH96,
  HD-61FH96 and HD-56FH96. Applicability to HD-61FH97 and HD-70FH97 is
  UNRESOLVED; no repair establishes command support for those models.
- Authentication requirements are UNRESOLVED. Absence of an authentication
  procedure in the source does not establish that authentication is unnecessary.
- Header 0x21 ('!') is "Operation command". Source also defines ACK (0x06) and
  NAK (0x15) as response headers but does not document their payload structure.
- `+/-` parameters on PW, AM, VS and AS are described as toggle switching.
  IP distinguishes "input+toggle switching" and "input-toggle switching".
  UNRESOLVED: detailed toggle behavior beyond these descriptions.
- VL documents direct numerical volume setting with ASCII digits and data
  length "1 or 2". UNRESOLVED: accepted numerical range and padding rules;
  the source does not establish an accepted 00-99 range.
- IP lists "i.Link" (0x37) without per-model filtering.
  UNRESOLVED: model-specific availability; no regional exclusion is documented.
- Machine code is 0x82. The individual code is settable via SU/IC in the
  source-defined 0x80-0xFF range, with default 0x80 and last memory "yes".
  The command frames shown use individual code 0x80; addressing after changing
  the individual code must reflect the configured code.
- Front-key setup command encoding is UNRESOLVED: the source table gives
  0x46 0x4B (FK), while the parameter section gives 0x46 0x48 (FH).
  `setup_front_key_enable` is preserved with an unknown command rather than
  selecting either conflicting encoding.

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/custrel/television/RS-232Cver13.pdf
retrieved_at: 2026-07-24T18:36:05.682Z
last_checked_at: 2026-10-07T10:37:05.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:37:05.109Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 actions match source opcodes and parameters and transport values are supported; setup_front_key_enable matches semantically (spec leaves its FK/FH conflict UNRESOLVED). (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source does not list those models, and these repairs do not establish support for them. Source doc explicitly states D-SUB 9 pin male, asynchronous ASCII, 19200 bps, 8/Odd/1, no flow control. Frame = header (1) + Unit ID (2) + Command (2) + Data[n] + terminator 0x0A. Authentication requirements are UNRESOLVED; the source provides no authentication procedure."
- "firmware version range; model-specific availability of the listed i.Link input; detailed toggle behavior beyond the source descriptions."
- "state queries and NULL response behavior are not documented."
- "meaning and encoding of any second data byte.\""
- "accepted numerical volume range.\""
- "applicability of these settings to the table's FK subcommand because the parameter section names FH.\""
- "section 3.10 conflicts internally. The mandatory subcommand"
- "ACK payload structure not stated in source."
- "NAK payload structure not stated in source."
- "query syntax (e.g. \"PW?\") for retrieving device state"
- "accepted numerical volume range and padding rules."
- "exact sub-channel encoding and accepted channel range."
- "unsolicited notifications not documented in source."
- "no multi-step sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing"
- "detailed toggle behavior beyond these descriptions."
- "accepted numerical range and padding rules;"
- "model-specific availability; no regional exclusion is documented."
- "the source table gives"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
