---
spec_id: admin/shure-microflex-mxw
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure Microflex Wireless (MXW) Control Spec"
manufacturer: Shure
model_family: MXW1
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXW1
    - MXW2
    - MXW6
    - MXW8
    - MXWAPT2
    - MXWAPT4
    - MXWAPT8
    - MXWNCS2
    - MXWNCS4
    - MXWNCS8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - pubs2-api.prod.shureweb.eu
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXW
  - https://pubs2-api.prod.shureweb.eu/documents/public/render/7282.html.twig
retrieved_at: 2026-09-26T14:23:15.224Z
last_checked_at: 2026-09-26T14:23:15.224Z
generated_at: 2026-09-26T14:23:15.224Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no auth procedure in source"
  - "all parameters are command-based GET/SET; no standalone variables"
  - "no explicit multi-step macros in source"
  - "populate if source contains safety warnings"
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:15.224Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 units match; APT/NCS destinations, PRI/SEC roles, firmware, feedback sentinels and source ambiguities are correctly scoped. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Shure Microflex Wireless (MXW) Control Spec

## Summary
Wireless microphone system with TCP/IP control via MXWAPT (access point transceiver). Commands sent to APT IP address relay to linked transmitters. Port 2202, ASCII protocol, GET/SET/REP/SAMPLE command types.

<!-- UNRESOLVED: no auth procedure in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: UNRESOLVED  # source does not establish authentication
```

## Traits
```yaml
- powerable  # inferred: TX_STATUS SET OFF command present
- queryable  # inferred: GET commands present for all parameters
- routable   # inferred: REMOTE_LINK command present
- levelable  # inferred: AUDIO_GAIN, INT_AUDIO_GAIN with INC/DEC
```

## Actions
```yaml
- id: get_chan_name
  label: Get Channel Name
  kind: query
  params:
    - name: channel
      type: integer
      description: Channel1..8 within APT model capacity. Section lists1..8; generic convention says0=all, so CHAN_NAME all-channel applicability is UNRESOLVED and no0 guarantee is made.
    - name: secondary
      type: enum
      values:
        - primary
        - secondary
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x CHAN_NAME >; secondary < GET SEC x CHAN_NAME >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: set_chan_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel1..8 within APT model capacity. Section lists1..8; generic convention says0=all, so CHAN_NAME all-channel applicability is UNRESOLVED and no0 guarantee is made.
    - name: name
      type: string
      description: SET supports8 ASCII characters; shorter-length acceptance is UNRESOLVED. Allowed set A-Z,a-z,0-9, punctuation and space listed in Notes. Responses always31 characters; do not send31 because response is31.
    - name: secondary
      type: enum
      values:
        - primary
        - secondary
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x CHAN_NAME {name} >; secondary < SET SEC x CHAN_NAME {name} >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_device_id
  label: Get Device ID
  kind: query
  params: []
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Wire form < GET DEVICE_ID >; device scope, no channel or secondary prefix.
- id: set_device_id
  label: Set Device ID
  kind: action
  params:
    - name: id
      type: string
      description: 1..8 ASCII characters from same allowed set as channel name; response padded to31 characters.
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Wire form < SET DEVICE_ID {id} >; device scope, no channel or secondary prefix.
- id: unlink
  label: Unlink Microphone
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 within capacity.0 all-channels is explicitly prohibited.
    - name: secondary
      type: enum
      description: primary selects omitted prefix or documented PRI; secondary emits SEC. Unlink succeeds even if TX is off/on non-networked charger, preventing later reconnection although TX cannot receive unlink.
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: APT wire forms < SET x UNLINK > (legacy/primary), < SET PRI x UNLINK > (explicit primary), < SET SEC x UNLINK > (secondary). Send to APT for APT-channel addressing. Source also refers to charger-bay x but leaves that endpoint-specific unlink behavior UNRESOLVED here.
- id: flash
  label: Flash Identify
  kind: action
  params:
    - name: channel
      type: integer
      description: Optional channel index within model capacity; omit entire token for device identify.0 follows generic all-channel convention. Does not select OFF; use flash_off.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
    - name: scope
      type: enum
      values:
        - device
        - channel
      description: Required selection of device versus channel grammar; channel is required only for channel scope.
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: 'Identify ON variants: < SET FLASH ON > (primary device), < SET SEC FLASH ON > (secondary device), < SET x FLASH ON > (primary channel), < SET SEC x FLASH ON > (secondary channel). No channel token for device identify; select one listed form without inserting empty-token placeholders.'
- id: set_meter_rate
  label: Set Meter Rate
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: rate_ms
      type: integer
      description: ASCII milliseconds:00000 disables(default);00100..65535 enables. Values1..99 unsupported. Meter report is fixed5 characters; RF/audio samples are ASCII with scales UNRESOLVED.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x METER_RATE rate_ms >; secondary < SET SEC x METER_RATE rate_ms >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_tx_available
  label: Get Transmitter Available
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x TX_AVAILABLE >; secondary < GET SEC x TX_AVAILABLE >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_tx_status
  label: Get Transmitter Status
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x TX_STATUS >; secondary < GET SEC x TX_STATUS >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: set_tx_status
  label: Set Transmitter Status
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: status
      type: enum
      values:
        - ACTIVE
        - MUTE
        - STANDBY
        - 'OFF'
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x TX_STATUS status >; secondary < SET SEC x TX_STATUS status >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_audio_gain
  label: Get Audio Gain
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x AUDIO_GAIN >; secondary < GET SEC x AUDIO_GAIN >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: value
      type: integer
      description: Offset gain integer0..60; actual dB=value-25. Source states3-character numeric field; SET example uses unpadded47 and REP uses047. No binary encoding.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x AUDIO_GAIN value >; secondary < SET SEC x AUDIO_GAIN value >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: inc_audio_gain
  label: Increment Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: delta
      type: integer
      description: ASCII integer dB increment/decrement amount; source examples10 increment,5 decrement. Complete delta bounds and clipping behavior UNRESOLVED; do not reuse offset encoding for delta.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x AUDIO_GAIN INC delta >; secondary < SET SEC x AUDIO_GAIN INC delta >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: dec_audio_gain
  label: Decrement Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: delta
      type: integer
      description: ASCII integer dB increment/decrement amount; source examples10 increment,5 decrement. Complete delta bounds and clipping behavior UNRESOLVED; do not reuse offset encoding for delta.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x AUDIO_GAIN DEC delta >; secondary < SET SEC x AUDIO_GAIN DEC delta >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_int_audio_gain
  label: Get Internal Audio Gain
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x INT_AUDIO_GAIN >; secondary < GET SEC x INT_AUDIO_GAIN >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: set_int_audio_gain
  label: Set Internal Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: value
      type: integer
      description: Offset gain integer0..40; actual dB=value-25. Source states3-character numeric field; SET example uses unpadded37 and REP uses037. No binary encoding.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x INT_AUDIO_GAIN value >; secondary < SET SEC x INT_AUDIO_GAIN value >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_button_sts
  label: Get Button Status
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BUTTON_STS >; secondary < GET SEC x BUTTON_STS >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_led_status
  label: Get LED Status
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x LED_STATUS >; secondary < GET SEC x LED_STATUS >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: set_led_status
  label: Set LED Status
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: red
      type: enum
      values:
        - 'ON'
        - OF
        - ST
        - FL
        - PU
        - NC
    - name: green
      type: enum
      values:
        - 'ON'
        - OF
        - ST
        - FL
        - PU
        - NC
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x LED_STATUS red green >; secondary < SET SEC x LED_STATUS red green >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_tx_type
  label: Get Transmitter Type
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x TX_TYPE >; secondary < GET SEC x TX_TYPE >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_bp_mic_select
  label: Get Mic Select
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BP_MIC_SELECT >; secondary < GET SEC x BP_MIC_SELECT >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_batt_charge
  label: Get Battery Charge
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BATT_CHARGE >; secondary < GET SEC x BATT_CHARGE >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_batt_run_time
  label: Get Battery Runtime
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BATT_RUN_TIME >; secondary < GET SEC x BATT_RUN_TIME >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_batt_health
  label: Get Battery Health
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BATT_HEALTH >; secondary < GET SEC x BATT_HEALTH >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_batt_time_to_full
  label: Get Time to Full Charge
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < GET x BATT_TIME_TO_FULL >; secondary < GET SEC x BATT_TIME_TO_FULL >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: get_tx_device_id
  label: Get Transmitter Device ID
  kind: query
  params:
    - name: channel
      type: integer
      description: APT channel or MXWNCS charger bay1..8 bounded by model capacity; GET explicitly allows0=all names. SET0 follows generic convention but is not separately exemplified.
    - name: secondary
      type: enum
      description: 'APT: select primary(omit prefix or PRI) or secondary(SEC). MXWNCS: unused; omit role prefix entirely.'
      values:
        - primary
        - secondary
    - name: endpoint
      type: enum
      values:
        - MXWAPT
        - MXWNCS
      description: Required TCP endpoint role. Connect to selected APT or charging-station IP; it changes interpretation of channel.
  notes: 'APT endpoint: x=APT channel, omitted/PRI=primary or SEC=secondary. MXWNCS endpoint: x=docked transmitter charger bay; use no PRI/SEC prefix. TCP2202 in both cases. Other direct transmitter IP endpoints are not established.'
  description: Primary wire form < GET x TX_DEVICE_ID >; secondary < GET SEC x TX_DEVICE_ID >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples. APT additionally permits explicit PRI. For MXWNCS use only the unprefixed form; no secondary-selection token is documented for charger.
- id: set_tx_device_id
  label: Set Transmitter Device ID
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel or MXWNCS charger bay1..8 bounded by model capacity; GET explicitly allows0=all names. SET0 follows generic convention but is not separately exemplified.
    - name: id
      type: string
      description: 1..12 characters A-Z,a-z,0-9,hyphen only. Source response pads to12 with trailing spaces. UNKNOWN report means missing/off/unsupported-firmware transmitter.
    - name: secondary
      type: enum
      description: 'APT: select primary(omit prefix or PRI) or secondary(SEC). MXWNCS: unused; omit role prefix entirely.'
      values:
        - primary
        - secondary
    - name: endpoint
      type: enum
      values:
        - MXWAPT
        - MXWNCS
      description: Required TCP endpoint role. Connect to selected APT or charging-station IP; it changes interpretation of channel.
  notes: 'APT endpoint: x=APT channel, omitted/PRI=primary or SEC=secondary. MXWNCS endpoint: x=docked transmitter charger bay; use no PRI/SEC prefix. TCP2202 in both cases. Other direct transmitter IP endpoints are not established.'
  description: Primary wire form < SET x TX_DEVICE_ID {id} >; secondary < SET SEC x TX_DEVICE_ID {id} >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples. APT additionally permits explicit PRI. For MXWNCS use only the unprefixed form; no secondary-selection token is documented for charger.
- id: remote_link
  label: Remote Link Microphone to APT
  kind: action
  params:
    - name: charger_bay
      type: integer
      description: Occupied charger bay1..2/4/8 according to MXWNCS model;0 prohibited.
    - name: apt_channel
      type: integer
      description: APT channel1..2/4/8 according to MXWAPT model;0 prohibited.
    - name: apt_ip
      type: string
      description: IPv4 address of destination APT carried inside braces in the command; distinct from charger connection IP.
    - name: secondary
      type: enum
      description: 'Required role: primary emits PRI; secondary emits SEC. Primary cannot omit this token.'
      values:
        - primary
        - secondary
    - name: charger_ip
      type: string
      description: Required MXWNCS IPv4 connection destination. Used to open TCP2202; not interpolated into REMOTE_LINK command payload.
  notes: Destination is MXWNCS charger IP, TCP2202, firmwarev4.0+. apt_ip is target APT address inside payload, not the TCP destination. No channel0/all-bays broadcast.
  description: Send < SET PRI x REMOTE_LINK y {apt_ip} > for primary or < SET SEC x REMOTE_LINK y {apt_ip} > for secondary. x=charger_bay, y=apt_channel. PRI/SEC is mandatory. IP payload braces follow source grammar.
- id: inc_int_audio_gain
  label: Increment Internal Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: delta
      type: integer
      description: ASCII integer dB amount, source example5. Complete bounds and clipping behavior UNRESOLVED. Delta is not gain+25.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x INT_AUDIO_GAIN INC delta >; secondary < SET SEC x INT_AUDIO_GAIN INC delta >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: dec_int_audio_gain
  label: Decrement Internal Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel1..8 limited by model capacity2/4/8. Generic source convention permits0 for all channels except operation-specific restrictions below.
    - name: delta
      type: integer
      description: ASCII integer dB amount, source example10. Complete bounds and clipping behavior UNRESOLVED. Delta is not gain+25.
    - name: secondary
      type: enum
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
      values:
        - primary
        - secondary
  notes: Connect TCP port2202 to MXWAPT IP; APT relays transmitter commands. Authentication and firmware minimum are UNRESOLVED unless stated per action.
  description: Primary wire form < SET x INT_AUDIO_GAIN DEC delta >; secondary < SET SEC x INT_AUDIO_GAIN DEC delta >. Substitute x=channel; other named fields correspond to params. Braces around string payloads are retained as in the primary examples.
- id: flash_off
  label: Stop Device Identify
  kind: action
  params: []
  command: < SET FLASH OFF >
  description: Documented device-level OFF form. Channel-specific or SEC-prefixed OFF forms are not documented and are not inferred.
  notes: Connect to MXWAPT TCP2202.
```

## Feedbacks
```yaml
- id: rep_chan_name
  label: Channel Name Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: name
      type: string
      description: 31-character name
    - name: secondary
      type: enum
      values:
        - primary
        - secondary
      description: 'Select primary or secondary transmitter: primary emits no prefix; secondary emits SEC before channel. This semantic selector is not itself sent as text.'
- id: rep_device_id
  label: Device ID Report
  kind: feedback
  params:
    - name: id
      type: string
      description: 31-character ID
- id: rep_unlink
  label: Unlink Result
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: result
      type: enum
      values:
        - SUCCESS
        - ERROR
    - name: secondary
      type: string
- id: rep_flash
  label: Flash Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: enum
      values:
        - 'ON'
        - 'OFF'
    - name: secondary
      type: string
- id: rep_meter_rate
  label: Meter Rate Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: rate
      type: integer
      description: Milliseconds
    - name: secondary
      type: string
- id: sample
  label: Meter Sample
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: rf_level
      type: integer
      description: ASCII numeric sample; engineering-unit scale and bounds UNRESOLVED.
    - name: audio_level
      type: integer
      description: ASCII numeric sample; engineering-unit scale and bounds UNRESOLVED.
    - name: secondary
      type: string
- id: rep_tx_available
  label: Transmitter Available Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: available
      type: enum
      values:
        - 'YES'
        - 'NO'
    - name: secondary
      type: string
- id: rep_tx_status
  label: Transmitter Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: enum
      values:
        - ACTIVE
        - MUTE
        - STANDBY
        - ON_CHARGER
        - UNKNOWN
      description: OFF is a setter value; unavailable/off transmitter is reported UNKNOWN. External Mute does not report MUTE because mixer performs muting.
    - name: secondary
      type: string
- id: rep_audio_gain
  label: Audio Gain Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: 000-060 offset by 25
    - name: secondary
      type: string
- id: rep_int_audio_gain
  label: Internal Audio Gain Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: 000-040 offset by 25
    - name: secondary
      type: string
- id: rep_button_sts
  label: Button Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: enum
      values:
        - 'ON'
        - 'OFF'
    - name: secondary
      type: string
- id: rep_led_status
  label: LED Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: red
      type: enum
      values:
        - 'ON'
        - OF
        - ST
        - FL
        - PU
        - NC
    - name: green
      type: enum
      values:
        - 'ON'
        - OF
        - ST
        - FL
        - PU
        - NC
    - name: secondary
      type: string
  description: Detailed table lists two-letter OF, while introductory example uses OFF; exact report spelling is source-inconsistent. Setter usesOF. Secondary SET example reply also omitsSEC; preserve ambiguity, do not assume all replies retain role prefix.
- id: rep_tx_type
  label: Transmitter Type Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: type
      type: enum
      values:
        - MXW1
        - MXW2
        - MXW6
        - MXW8
    - name: secondary
      type: string
- id: rep_bp_mic_select
  label: Mic Select Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values:
        - INT
        - EXT
        - AUTO
        - ERR
        - UNKNOWN
    - name: secondary
      type: string
- id: rep_batt_charge
  label: Battery Charge Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: 000-100, 255=device off
    - name: secondary
      type: string
- id: rep_batt_run_time
  label: Battery Runtime Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: ASCII5-digit minutes;65532=wall-wart power,65533=on charger,65534=calculating,65535=off.
    - name: secondary
      type: string
- id: rep_batt_health
  label: Battery Health Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: 000-100, 255=unknown
    - name: secondary
      type: string
- id: rep_batt_time_to_full
  label: Time to Full Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: ASCII5-digit minutes;65535=off,65534=on charger and fully charged,65533=on and not on charger. Do not reuse runtime meanings.
    - name: secondary
      type: string
- id: rep_tx_device_id
  label: Transmitter Device ID Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: id
      type: string
      description: 12-character padded ID
    - name: secondary
      type: string
- id: rep_remote_link
  label: Remote Link Result
  kind: feedback
  params:
    - name: primary_channel
      type: string
      description: PRI or SEC
    - name: channel
      type: integer
    - name: charger_bay
      type: integer
    - name: apt_ip
      type: string
    - name: result
      type: enum
      values:
        - SUCCESS
        - ERR
```

## Variables
```yaml
# UNRESOLVED: all parameters are command-based GET/SET; no standalone variables
# Battery percentages and runtime values are returned via GET commands
```

## Events
```yaml
- id: button_sts_change
  label: Button Status Change
  description: APT sends REP when microphone button pressed/released
  params:
    - name: channel
      type: integer
    - name: status
      type: string
      enum:
        - 'ON'
        - 'OFF'
- id: tx_available_change
  label: Transmitter Available Change
  description: APT reports availability changes; unavailable means off, unlinked or still establishing communication. Dock/undock can trigger transitions but does not uniquely determine availability.
  params:
    - name: channel
      type: integer
    - name: available
      type: string
      enum:
        - 'YES'
        - 'NO'
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
# External mute workflow described in notes but not command macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate if source contains safety warnings
# Note: External Mute requires constant audio signal per echo canceller requirement
```

## Notes

Endpoint routing is mandatory: MXWAPT receives APT/transmitter commands and relays to linked MXW1/2/6/8 microphones. MXWNCS receives REMOTE_LINK and its charger-bay TX_DEVICE_ID variants. Connect the controller as TCP client to port2202 of the appropriate endpoint. MXWANI4/8 occur in the source naming list, but direct control of ANI with these commands is not established; they are not listed as compatible endpoints. No additional transmitter models or firmware compatibility is inferred.

All requests/reports are ASCII, enclosed by literal angle brackets with spaces as shown. String/IP payloads use curly braces in the documented forms; names x,y,delta,etc denote substituted fields. Omitted primary-role or device-scope channel tokens must be omitted completely, not transmitted as the word primary or as a placeholder. Any additional CR/LF terminator is UNRESOLVED because this source does not define one. Authentication is UNRESOLVED. SOURCE examples are available per Action, not an invented universal interpolation syntax.

Channel0 means all under the generic convention, but UNLINK/REMOTE_LINK forbid0 and CHAN_NAME's explicit1..8 table conflicts with that blanket rule. Honor the operation-specific limits. APT/NCS models have2/4/8 channels/bays respectively. PRI may be omitted only where documented (UNLINK or APT TX_DEVICE_ID); REMOTE_LINK requiresPRI/SEC. Other secondary-capable commands use SEC or omit the prefix for primary.

CHAN_NAME SET supports8 characters;31 is the returned padded length, not a setter limit. DEVICE_ID SET accepts1..8; returned length31. Their allowed set is A-Z,a-z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`~ and space. TX_DEVICE_ID SET accepts1..12 characters A-Z,a-z,0-9,hyphen; returned names pad to12. Escaping literal framing characters inside name strings is UNRESOLVED; do not invent an escape scheme.

AUDIO_GAIN offset domain0..60 means-25..+35dB; INT_AUDIO_GAIN0..40 means-25..+15dB. The25 offset applies only to those absolute gain fields, not to RF/sample meters, battery values or INC/DEC amounts. Battery sentinel meanings are property-specific: runtime65532 wall-wart,65533 charger,65534 calculating,65535 off; time-to-full65533 on/not charging,65534 charged on charger,65535 off; charge255 off; health255 unknown. The general codes list also mentions252..254 and65532..65535, but unsupported per-property meanings remainUNRESOLVED.

Most changed properties produce unsolicited REP messages; meter values use SAMPLE at METER_RATE. GET/SET returns REP; < REP ERR > indicates an unimplemented/invalid request. On TX_AVAILABLE NO→YES, refresh that channel's TX_STATUS,AUDIO_GAIN,BATT_RUN_TIME,BATT_CHARGE,BATT_HEALTH,BUTTON_STS,LED_STATUS,TX_TYPE. Button reports ON=pressed/OFF=released are pushed; repeated polling is unnecessary.

Set LED_STATUS only after enabling External LED Control in the MXW GUI. Gooseneck microphones additionally select MX400 Series Bi-color LED versus MX400R Series Red LED. Setter red/green tokens areON,OF,ST,FL,PU,NC; OF is the documented two-character off token. The introductory report example usesOFF, inconsistent with the detailed two-character report table; exact report alternatives remainUNRESOLVED.

Echo-canceller applications require constant microphone audio and muting in the external mixer. Set MXWAPT Preferences/Mute Preference to External Mute, interpret button events in controller code (including momentary/latching behavior), mute/unmute the mixer and update microphone LEDs after mixer confirmation. Do not substitute local TX_STATUS MUTE for this external-mute workflow. An unavailable transmitter can change parameters; monitor availability before assuming cached values remain current.

Firmwarev4.0+ is explicitly required for REMOTE_LINK; minimum firmware for other commands, authentication, exact framing-character escaping, meter engineering scales, complete increment/decrement bounds and source-inconsistent LED replies remainUNRESOLVED. Additional unlinked-charger commands are referred to vendor support but not documented; none are invented here.

## Provenance

```yaml
source_domains:
  - shure.com
  - pubs2-api.prod.shureweb.eu
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXW
  - https://pubs2-api.prod.shureweb.eu/documents/public/render/7282.html.twig
retrieved_at: 2026-09-26T14:23:15.224Z
last_checked_at: 2026-09-26T14:23:15.224Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:15.224Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 units match; APT/NCS destinations, PRI/SEC roles, firmware, feedback sentinels and source ambiguities are correctly scoped. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no auth procedure in source"
- "all parameters are command-based GET/SET; no standalone variables"
- "no explicit multi-step macros in source"
- "populate if source contains safety warnings"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
