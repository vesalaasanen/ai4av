---
spec_id: admin/shure-mxwapxx-next-4-8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXWAPXx neXt 4 8 Control Spec"
manufacturer: Shure
model_family: MXWAPT2
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXWAPT2
    - MXWAPT4
    - MXWAPT8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://techportal.shure.com/en
retrieved_at: 2026-05-13T21:24:58.616Z
last_checked_at: 2026-10-07T12:55:07.344Z
generated_at: 2026-10-07T12:55:07.344Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not supported per source — omitted per N/A rule"
  - "no standalone Variables section distinct from Actions/Feedbacks in source"
  - "no explicit event subscription model documented"
  - "no explicit safety warnings or interlock procedures in source."
  - "firmware version compatibility not stated in source"
  - "REMOTE_LINK requires firmware v4.0 or greater according to the MXWNCS section; applicability to the MXWAPT target models is unresolved"
  - "TCP keepalive or connection maintenance details not documented"
  - "maximum concurrent connections not stated"
  - "REMOTE_LINK and charger-bay TX_DEVICE_ID commands are documented under MXWNCS Commands; applicability to this spec's MXWAPT target models is unresolved"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:55:07.344Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 action units match source commands, and port 2202 over TCP is confirmed. The spec covers the MXWAPT catalogue, including the MXWNCS commands it caveats as unresolved. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Shure MXWAPXx neXt 4 8 Control Spec

## Summary
Access point transceiver family (MXWAPT2/4/8) for Shure Microflex Wireless microphone systems. MXWAPT control strings use Ethernet TCP/IP on port 2202 and are sent to the IP address associated with the APT. The source documents REMOTE_LINK and charger-bay TX_DEVICE_ID commands under MXWNCS Commands; their applicability to the MXWAPT models in this spec is unresolved. All messages are ASCII. The device sends unsolicited REP reports when values change, except for metered properties. Authentication requirements are not stated in the source.

<!-- UNRESOLVED: serial/RS-232 not supported per source — omitted per N/A rule -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: UNRESOLVED  # Source does not state authentication requirements.
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# All command strings are ASCII, framed by "< >" delimiters per source.
# x = channel 1-8 (0 = all channels where allowed). SEC prefix addresses the
# secondary microphone on a channel; PRI (or omitted where documented) addresses the primary.

# --- MXWAPT Commands: SET operations (existing, payloads added) ---

- id: set_chan_name
  label: Set Channel Name
  kind: action
  command: "< SET {x} CHAN_NAME {name} >"  # Secondary: "< SET SEC {x} CHAN_NAME {name} >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8
    - name: name
      type: string
      description: SET accepts up to 8 characters from set A-Z,a-z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`~ and space; replies are padded to 31 characters

- id: set_device_id
  label: Set Device ID
  kind: action
  command: "< SET DEVICE_ID {device_id} >"
  params:
    - name: device_id
      type: string
      description: 1-8 characters from set A-Z,a-z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`~ and space

- id: unlink_transmitter
  label: Unlink Transmitter
  kind: action
  command: "< SET {x} UNLINK >"  # Also documented: "< SET {pri_sec} {x} UNLINK >", where pri_sec is PRI or SEC
  params:
    - name: x
      type: integer
      description: APT channel or charger bay (1-8; 0 is not allowed)
    - name: pri_sec
      type: string
      description: Optional PRI or SEC prefix; omit for the legacy or primary form

- id: set_flash
  label: Set Flash
  kind: action
  command: "< SET {x} FLASH {state} >"  # Device-level primary: "< SET FLASH {state} >"; secondary channel: "< SET SEC {x} FLASH {state} >"; secondary device-level: "< SET SEC FLASH {state} >"
  params:
    - name: x
      type: integer
      description: Channel number (omit for device-level identify)
    - name: secondary
      type: string
      description: SEC for secondary commands; omit for primary
    - name: state
      type: string
      enum: [ON, OFF]
      description: Flash state

- id: set_meter_rate
  label: Set Meter Rate
  kind: action
  command: "< SET {x} METER_RATE {sssss} >"  # Secondary: "< SET SEC {x} METER_RATE {sssss} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: SEC for secondary microphone; omit for primary
    - name: sssss
      type: integer
      description: Five-character metering interval in milliseconds (00000=off, 00100-65535)

- id: set_tx_status
  label: Set Transmitter Status
  kind: action
  command: "< SET {x} TX_STATUS {status} >"  # Secondary: "< SET SEC {x} TX_STATUS {status} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: SEC for secondary microphone; omit for primary
    - name: status
      type: string
      enum: [ACTIVE, MUTE, STANDBY, OFF]
      description: Desired transmitter status

- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  command: "< SET {x} AUDIO_GAIN {value} >"  # Relative forms: "< SET x AUDIO_GAIN DEC n >" or "< SET x AUDIO_GAIN INC n >"; secondary forms insert SEC before x
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: SEC for secondary microphone; omit for primary
    - name: value
      type: string
      description: Numeric gain from 000 to 060 in increments of 1, with reported and set values offset by 25; source also documents DEC n and INC n relative forms

- id: set_int_audio_gain
  label: Set Internal Audio Gain
  kind: action
  command: "< SET {x} INT_AUDIO_GAIN {value} >"  # Relative forms: "< SET x INT_AUDIO_GAIN DEC n >" or "< SET x INT_AUDIO_GAIN INC n >"; secondary forms insert SEC before x
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: SEC for secondary microphone; omit for primary
    - name: value
      type: string
      description: Numeric gain from 000 to 040 in increments of 1, with reported and set values offset by 25; source also documents DEC n and INC n relative forms

- id: set_led_status
  label: Set LED Status
  kind: action
  command: "< SET {x} LED_STATUS {rr} {gg} >"  # Secondary: "< SET SEC {x} LED_STATUS {rr} {gg} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: SEC for secondary microphone; omit for primary
    - name: rr
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
      description: Red LED state (ON=On, OF=Off, ST=Strobe, FL=Flash, PU=Pulse, NC=No Change)
    - name: gg
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
      description: Green LED state

- id: set_tx_device_id
  label: Set Transmitter Device ID
  kind: action
  command: "< SET {x} TX_DEVICE_ID {device_id} >"  # PRI explicit: "< SET PRI {x} TX_DEVICE_ID {device_id} >"; secondary: "< SET SEC {x} TX_DEVICE_ID {device_id} >"
  params:
    - name: x
      type: integer
      description: Channel number
    - name: secondary
      type: string
      description: PRI or SEC prefix; omit for primary
    - name: device_id
      type: string
      description: 1-12 characters (A-Z, a-z, 0-9, -); shorter IDs are padded to 12 characters in replies

- id: remote_link
  label: Remote Link
  kind: action
  command: "< SET {pri_sec} {x} REMOTE_LINK {y} {zzz.zzz.zzz.zzz} >"
  params:
    - name: pri_sec
      type: string
      description: PRI or SEC
    - name: x
      type: integer
      description: Charger bay number the transmitter is in
    - name: y
      type: integer
      description: MXWAPT channel number
    - name: zzz.zzz.zzz.zzz
      type: string
      description: IP address of MXWAPT
  # Source documents REMOTE_LINK under MXWNCS Commands, not MXWAPT Commands; applicability to this spec's target models is unresolved.

- id: set_tx_device_id_ncs
  label: Set Transmitter Device ID (NCS)
  kind: action
  command: "< SET {x} TX_DEVICE_ID {device_id} >"
  params:
    - name: x
      type: integer
      description: Charger bay number the transmitter is docked in
    - name: device_id
      type: string
      description: 1-12 characters (A-Z, a-z, 0-9, -); shorter IDs are padded to 12 characters in replies
  # Source documents this command under MXWNCS Commands; applicability to this spec's target models is unresolved.

# --- MXWAPT Commands: GET/query operations (source documents each) ---

- id: query_chan_name
  label: Query Channel Name
  kind: query
  command: "< GET {x} CHAN_NAME >"  # Secondary: "< GET SEC {x} CHAN_NAME >"
  params:
    - name: x
      type: integer
      description: Channel number 1-8

- id: query_device_id
  label: Query Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []

- id: query_tx_available
  label: Query Transmitter Available
  kind: query
  command: "< GET {x} TX_AVAILABLE >"  # Secondary: "< GET SEC {x} TX_AVAILABLE >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_tx_status
  label: Query Transmitter Status
  kind: query
  command: "< GET {x} TX_STATUS >"  # Secondary: "< GET SEC {x} TX_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_audio_gain
  label: Query Audio Gain
  kind: query
  command: "< GET {x} AUDIO_GAIN >"  # Secondary: "< GET SEC {x} AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_int_audio_gain
  label: Query Internal Audio Gain
  kind: query
  command: "< GET {x} INT_AUDIO_GAIN >"  # Secondary: "< GET SEC {x} INT_AUDIO_GAIN >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_button_sts
  label: Query Button Status
  kind: query
  command: "< GET {x} BUTTON_STS >"  # Secondary: "< GET SEC {x} BUTTON_STS >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_led_status
  label: Query LED Status
  kind: query
  command: "< GET {x} LED_STATUS >"  # Secondary: "< GET SEC {x} LED_STATUS >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_tx_type
  label: Query Transmitter Type
  kind: query
  command: "< GET {x} TX_TYPE >"  # Secondary: "< GET SEC {x} TX_TYPE >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_bp_mic_select
  label: Query Microphone Select
  kind: query
  command: "< GET {x} BP_MIC_SELECT >"  # Secondary: "< GET SEC {x} BP_MIC_SELECT >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_batt_charge
  label: Query Battery Charge
  kind: query
  command: "< GET {x} BATT_CHARGE >"  # Secondary: "< GET SEC {x} BATT_CHARGE >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_batt_run_time
  label: Query Battery Runtime
  kind: query
  command: "< GET {x} BATT_RUN_TIME >"  # Secondary: "< GET SEC {x} BATT_RUN_TIME >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_batt_health
  label: Query Battery Health
  kind: query
  command: "< GET {x} BATT_HEALTH >"  # Secondary: "< GET SEC {x} BATT_HEALTH >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_batt_time_to_full
  label: Query Battery Time to Full
  kind: query
  command: "< GET {x} BATT_TIME_TO_FULL >"  # Secondary: "< GET SEC {x} BATT_TIME_TO_FULL >"
  params:
    - name: x
      type: integer
      description: Channel number

- id: query_tx_device_id
  label: Query Transmitter Device ID
  kind: query
  command: "< GET {x} TX_DEVICE_ID >"  # PRI explicit: "< GET PRI {x} TX_DEVICE_ID >"; secondary: "< GET SEC {x} TX_DEVICE_ID >"; GET x=0 gets all microphone names
  params:
    - name: x
      type: integer
      description: Channel number (0=all)

- id: query_tx_device_id_ncs
  label: Query Transmitter Device ID (NCS)
  kind: query
  command: "< GET {x} TX_DEVICE_ID >"
  params:
    - name: x
      type: integer
      description: Charger bay the transmitter is docked in (0=all)
  # Source documents this query under MXWNCS Commands; applicability to this spec's target models is unresolved.
```

## Feedbacks
```yaml
- id: chan_name
  label: Channel Name
  type: string
  description: 31-character channel name
  values: []  # String uses set A-Z,a-z,0-9,!"#$%&'()*+,-./:;<=>?@[\]^_`~ and space

- id: device_id
  label: Device ID
  type: string
  description: 31-character Device ID (space-padded)

- id: unlink_result
  label: Unlink Result
  type: enum
  values: [SUCCESS, ERROR]
  channels: [1-8]

- id: flash_state
  label: Flash State
  type: enum
  values: [ON, OFF]

- id: meter_rate
  label: Meter Rate
  type: integer
  description: Metering interval in ms (00000=off, 00100-65535)
  channels: [1-8]
  secondary: true

- id: sample
  label: Sample
  type: object
  description: Unsolicited audio/RF metering data (SAMPLE format)
  fields:
    - name: channel
      type: integer
    - name: rf_level
      type: string
      description: RF level (aaa)
    - name: audio_level
      type: string
      description: Audio level (eee)

- id: tx_available
  label: Transmitter Available
  type: enum
  values: [YES, NO]
  channels: [1-8]
  secondary: true

- id: tx_status
  label: Transmitter Status
  type: enum
  values: [ACTIVE, MUTE, STANDBY, ON_CHARGER, UNKNOWN]
  channels: [1-8]
  secondary: true

- id: audio_gain
  label: Audio Gain
  type: integer
  description: Gain value 000-060 (actual dB = value - 25)
  channels: [1-8]
  secondary: true

- id: int_audio_gain
  label: Internal Audio Gain
  type: integer
  description: Gain value 000-040 (actual dB = value - 25)
  channels: [1-8]
  secondary: true

- id: button_sts
  label: Button Status
  type: enum
  values: [ON, OFF]
  description: Microphone button pressed/released state
  channels: [1-8]
  secondary: true

- id: led_status
  label: LED Status
  type: object
  description: Red and green LED states
  fields:
    - name: red
      type: enum
      values: [ON, OF, ST, FL, PU, NC]
    - name: green
      type: enum
      values: [ON, OF, ST, FL, PU, NC]
  channels: [1-8]
  secondary: true

- id: tx_type
  label: Transmitter Type
  type: enum
  values: [MXW1, MXW2, MXW6, MXW8]
  channels: [1-8]
  secondary: true

- id: bp_mic_select
  label: Microphone Select
  type: enum
  values: [INT, EXT, ERR, UNKNOWN]
  channels: [1-8]
  secondary: true

- id: batt_charge
  label: Battery Charge
  type: integer
  description: Remaining battery life as percentage (000-100; 255=device off)
  channels: [1-8]
  secondary: true

- id: batt_run_time
  label: Battery Runtime
  type: integer
  description: Minutes until microphone turns off; special codes 65532-65535
  channels: [1-8]
  secondary: true

- id: batt_health
  label: Battery Health
  type: integer
  description: Capacity percentage relative to factory original (000-100; 255=unknown)
  channels: [1-8]
  secondary: true

- id: batt_time_to_full
  label: Battery Time to Full
  type: integer
  description: Minutes until fully charged; special codes 65533-65535
  channels: [1-8]
  secondary: true

- id: tx_device_id
  label: Transmitter Device ID
  type: string
  description: 12-character transmitter ID (space-padded)
  channels: [1-8]
  secondary: true

- id: remote_link_result
  label: Remote Link Result
  type: enum
  values: [SUCCESS, ERR]
  description: Result of REMOTE_LINK command; source documents this command under MXWNCS Commands, so target applicability is unresolved

- id: error
  label: Error
  type: string
  description: "< REP ERR >" - command not implemented (typo or non-existent command)

# Special codes for 3-digit responses (255, 254, 253, 252)
# Special codes for 5-digit responses (65535, 65534, 65533, 65532)
# See Notes section for mapping
```

## Variables
```yaml
# All settable parameters exposed via GET/SET/REP pattern.
# See Actions and Feedbacks above for full variable list.
# UNRESOLVED: no standalone Variables section distinct from Actions/Feedbacks in source
```

## Events
```yaml
# Device sends unsolicited REP when values change (except metered properties).
# See Feedbacks for list of observable states.
# UNRESOLVED: no explicit event subscription model documented
```

## Macros
```yaml
# External mute workflow (teleconferencing):
# 1. Select "External Mute" in MXWAPT web app Preferences
# 2. Mic button press → APT sends BUTTON_STS ON → control system unmutes mixer
# 3. Mic button release → APT sends BUTTON_STS OFF → control system mutes mixer
# 4. LED state set via SET LED_STATUS ON OF / OF ON for red/green indication

# Flash identify (per device or per channel):
# < SET FLASH ON > or < SET x FLASH ON > → device/channel identifies → < REP FLASH OFF >
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: echo cancellation requires constant audio signal; muting is done in the external echo canceller/mixer, not locally at the microphone.
```

## Notes
**Command syntax:** ASCII strings enclosed in `< >`. GET/SET/REP/SAMPLE formats. `x` = channel 0-8 (0=all channels where documented). `SEC` prefix addresses a secondary microphone on a channel.

**Battery special codes (3-digit, BATT_CHARGE, BATT_HEALTH):** 255 = device off / unknown, as specified for each property in the source.

**Battery special codes (5-digit, BATT_RUN_TIME, BATT_TIME_TO_FULL):**
- BATT_RUN_TIME 65532: powered by wall wart charger
- BATT_RUN_TIME 65533: on charger
- BATT_RUN_TIME 65534: runtime being calculated
- BATT_RUN_TIME 65535: device off
- BATT_TIME_TO_FULL 65535: transmitter off
- BATT_TIME_TO_FULL 65534: on charger and fully charged
- BATT_TIME_TO_FULL 65533: transmitter on and not on charger

**Audio gain offset:** Reported and set values are offset by 25. Source example: SET value 47 yields reported value 047; actual dB = value - 25.

**LED values:** rr/gg = ON, OF, ST, FL, PU, NC (On, Off, Strobe, Flash, Pulse, No Change).

**CHAN_NAME SET:** Supports up to 8 characters; device responds with a 31-character name.

**Channel 0:** Used for GET ALL on TX_DEVICE_ID. Not valid for UNLINK. Other uses depend on the command documentation.

**Metering:** `SAMPLE` messages are sent at configured METER_RATE interval. `00000` = metering off. `00100` to `65535` ms per sample; `00000` is the documented default.

**External mute for teleconferencing:** Select "External Mute" in the MXWAPT web app. Muting is done in the external echo canceller/mixer, not at the microphone.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: REMOTE_LINK requires firmware v4.0 or greater according to the MXWNCS section; applicability to the MXWAPT target models is unresolved -->
<!-- UNRESOLVED: TCP keepalive or connection maintenance details not documented -->
<!-- UNRESOLVED: maximum concurrent connections not stated -->
<!-- UNRESOLVED: REMOTE_LINK and charger-bay TX_DEVICE_ID commands are documented under MXWNCS Commands; applicability to this spec's MXWAPT target models is unresolved -->

## Provenance

```yaml
source_domains:
  - pubs.shure.com
  - techportal.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://techportal.shure.com/en
retrieved_at: 2026-05-13T21:24:58.616Z
last_checked_at: 2026-10-07T12:55:07.344Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:55:07.344Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 action units match source commands, and port 2202 over TCP is confirmed. The spec covers the MXWAPT catalogue, including the MXWNCS commands it caveats as unresolved. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not supported per source — omitted per N/A rule"
- "no standalone Variables section distinct from Actions/Feedbacks in source"
- "no explicit event subscription model documented"
- "no explicit safety warnings or interlock procedures in source."
- "firmware version compatibility not stated in source"
- "REMOTE_LINK requires firmware v4.0 or greater according to the MXWNCS section; applicability to the MXWAPT target models is unresolved"
- "TCP keepalive or connection maintenance details not documented"
- "maximum concurrent connections not stated"
- "REMOTE_LINK and charger-bay TX_DEVICE_ID commands are documented under MXWNCS Commands; applicability to this spec's MXWAPT target models is unresolved"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
