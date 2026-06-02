---
spec_id: admin/rako-wra232bridge
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rako WRA232Bridge Control Spec"
manufacturer: Rako
model_family: WRA-232
aliases: []
compatible_with:
  manufacturers:
    - Rako
  models:
    - WRA-232
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rakocontrols.com
  - manualmachine.com
  - scribd.com
  - wiki.london.hackspace.org.uk
source_urls:
  - https://rakocontrols.com/media/1956/accessing-the-rako-bridge-v222.pdf
  - https://rakocontrols.com/media/1315/wra232-instruction-manual.pdf
  - https://manualmachine.com/rako/wra232/2505407-user-manual/
  - https://www.scribd.com/document/830853576/accessing-the-rako-hub
  - https://wiki.london.hackspace.org.uk/view/Project:Java-Rako/Published_API
retrieved_at: 2026-05-18T10:41:50.992Z
last_checked_at: 2026-06-02T22:13:29.018Z
generated_at: 2026-06-02T22:13:29.018Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP interface documented for RA/RTC/WA/WTC-Bridge and APR/WRE-Bridge products but NOT explicitly confirmed for WRA-232 in this source. UNRESOLVED: Custom String parameter (string=X&run=1) documented as WRA-232 specific but unclear if HTTP is supported on WRA-232."
  - "no safety warnings or interlock procedures found in source"
  - "Full RS232 command protocol details not included - refer to separate Rako RS232 Command Summary document. UNRESOLVED: XML download interface (rakobridge/rako.xml) documented for RA/RTC/WA/WTC-Bridge only, not confirmed for WRA-232."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:29.018Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Rako WRA232Bridge Control Spec

## Summary
The Rako WRA232Bridge is a control bridge supporting RS-232, TCP/IP (Telnet), HTTP, and UDP protocols for controlling Rako lighting systems. All protocols share the same command structure documented in the Rako RS232 Command Summary. The bridge controls rooms, channels, scenes, and levels.

<!-- UNRESOLVED: HTTP interface documented for RA/RTC/WA/WTC-Bridge and APR/WRE-Bridge products but NOT explicitly confirmed for WRA-232 in this source. UNRESOLVED: Custom String parameter (string=X&run=1) documented as WRA-232 specific but unclear if HTTP is supported on WRA-232. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
  - udp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 9761  # Telnet and UDP port
base_url: /rako.cgi  # HTTP GET endpoint
auth:
  type: none  # inferred: no login required for Telnet or HTTP
```

## Traits
```yaml
- powerable  # inferred: OFF command (0x00) present
- routable   # inferred: room/channel/scene routing commands present
- levelable  # inferred: level control commands present (FADE, SET_LEVEL)
- queryable  # inferred: scene cache and level cache query commands present
```

## Actions
```yaml
- id: off
  label: Off
  kind: action
  params:
    - name: room
      type: integer
      description: Room number (0 = Whole House, 1-255 = Standard, 256-1019 = Extended)
    - name: channel
      type: integer
      description: Channel number (0 = All Channels, 1-15 = Standard, 16-255 = Extended)
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x00, checksum]

- id: fade_up
  label: Fade Up
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x01, checksum]

- id: fade_down
  label: Fade Down
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x02, checksum]

- id: set_scene
  label: Set Scene
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
    - name: scene
      type: integer
      description: Scene number (1-16 Standard, 17+ Reserved)
    - name: flags
      type: integer
      description: "0x01 = Use Default Fade Rate"
  protocol: udp
  command: [0x52, 0x07, room_hi, room_lo, channel, 0x31, flags, scene, checksum]

- id: fade
  label: Fade to Level
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
    - name: level
      type: integer
      description: Level 0-255 (0=0%, 255=100%)
    - name: flags
      type: integer
      description: "Bit 0: Fade Up(0)/Down(1), Bit 7: Use Default Fade Rate"
  protocol: udp
  command: [0x52, 0x07, room_hi, room_lo, channel, 0x32, flags, level, checksum]

- id: set_level
  label: Set Level
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
    - name: level
      type: integer
      description: Level 0-255 (0=0%, 255=100%)
    - name: flags
      type: integer
      description: "0x01 = Use Default Fade Rate"
  protocol: udp
  command: [0x52, 0x07, room_hi, room_lo, channel, 0x34, flags, level, checksum]

- id: stop
  label: Stop
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x0F, checksum]

- id: ident
  label: Ident
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x08, checksum]

- id: store
  label: Store
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
  protocol: udp
  command: [0x52, 0x05, room_hi, room_lo, channel, 0x0D, checksum]

- id: custom_232
  label: Custom String
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
    - name: string_id
      type: integer
      description: Custom String ID
    - name: flags
      type: integer
      description: Reserved (set to 0)
  protocol: udp
  command: [0x52, 0x07, room_hi, room_lo, channel, 0x2D, flags, string_id, checksum]

- id: holiday
  label: Holiday Mode
  kind: action
  params:
    - name: room
      type: integer
    - name: channel
      type: integer
    - name: flags
      type: integer
      description: "0x00=STOP_PLAYBACK, 0x01=START_PLAYBACK, 0x02=START_RECORD, 0x03=STOP_RECORD"
  protocol: udp
  command: [0x52, 0x06, room_hi, room_lo, channel, 0x2F, flags, checksum]

# HTTP GET equivalents
- id: http_set_scene
  label: Set Scene via HTTP
  kind: action
  params:
    - name: room
      type: integer
    - name: ch
      type: integer
      description: Channel number
    - name: sc
      type: integer
      description: Scene number (0=Off, 1-16 Standard)
  protocol: http
  example: "/rako.cgi?room=5&ch=4&sc=3"

- id: http_set_level
  label: Set Level via HTTP
  kind: action
  params:
    - name: room
      type: integer
    - name: ch
      type: integer
      description: Channel (0 = All Channels in room)
    - name: lev
      type: integer
      description: Level 0-255
  protocol: http
  example: "/rako.cgi?room=10&ch=0&lev=255"

- id: http_send_command
  label: Send Command via HTTP
  kind: action
  params:
    - name: room
      type: integer
    - name: ch
      type: integer
    - name: com
      type: integer
      description: "Command: 0=Off, 1=FadeUp, 2=FadeDown, 3-6=SC1-4, 8=Ident, 15=Stop"
    - name: event
      type: integer
      description: "run=1 required for event parameter"
  protocol: http
  example: "/rako.cgi?room=50&ch=0&com=1 (Press), /rako.cgi?room=50&ch=0&com=15 (Release)"

- id: http_trigger_event
  label: Trigger Event via HTTP
  kind: action
  params:
    - name: event
      type: integer
      description: Event number
    - name: run
      type: integer
      description: Must be 1
  protocol: http
  example: "/rako.cgi?event=2&run=1"

- id: http_custom_string
  label: Trigger Custom String via HTTP
  kind: action
  params:
    - name: string
      type: integer
      description: Custom String number
    - name: run
      type: integer
      description: Must be 1
  protocol: http
  example: "/rako.cgi?string=3&run=1"
```

## Feedbacks
```yaml
- id: command_ack
  type: string
  values: [AOK, AERROR]
  protocol: udp
  description: UDP command acknowledgement

- id: scene_cache_reply
  type: binary
  protocol: udp
  description: "Scene cache reply: 0x43 ('C') prefix, followed by bytes containing scene/room pairs. Max 32 cached items."
  example: "0x43030C1CD5 = Room 28 Scene 3"

- id: level_cache_reply
  type: binary
  protocol: udp
  description: "Level cache reply: 0x58 ('X') prefix with level data per room/channel"
  example: "0x58 04 80 49 01 ff bf... = Room 73 Channel 1,2 levels"

- id: status_broadcast
  type: binary
  protocol: udp
  description: "UDP broadcast status messages from bridge on port 9761. Format: 0x53 ('S') prefix, same structure as command packets."
  example: "0x530A000500310104000000C5 = Room 5 Channel 0 Scene 4"

- id: http_success
  type: string
  protocol: http
  description: "HTTP GET returns page containing 'Success!' - indicates message delivered to bridge, not circuit"
```

## Variables
```yaml
- id: room_level
  type: integer
  range: [0, 255]
  description: Current dimmer level for a room/channel combination
  protocol: udp
  access: get  # via level cache query (0x5121)

- id: scene_cache
  type: object
  description: Last scene set per room (up to 64 rooms cached)
  protocol: udp
  access: get
  url: http://rakobridge/scenes.htm
```

## Events
```yaml
- id: status_change
  type: broadcast
  protocol: udp
  port: 9761
  description: Bridge sends UDP broadcast on status changes (from v1.2.2)
  format: "0x53 prefix, bytes follow command packet structure with room/channel/command/data"
```

## Macros
```yaml
# Scene recall: set_scene with room, channel, scene number
# Scene off: set_scene with scene=0
# Fade to level: fade command with flags and level
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
The Rako protocol is shared across RAV232, RAV232+, and WRA-232 products. The command summary is documented in a separate document: 'Rako RS232 Command Summary'. HTTP interface documentation lists different product families - WRA-232 specifically supports the Custom String parameter for the string CGI parameter. The Telnet interface (port 9761) is used by Rasoft software and cannot be used simultaneously with Rasoft. UDP discovery uses a broadcast 'D' (0x44) packet and bridge responds with NETBIOS name and MAC address. All text over UDP is encoded in WINDOWS-1252. Scene cache is volatile (reset on bridge power up) while level per scene data is persistent (uploaded from Rasoft). CRC/checksum is required on all UDP packets.
<!-- UNRESOLVED: Full RS232 command protocol details not included - refer to separate Rako RS232 Command Summary document. UNRESOLVED: XML download interface (rakobridge/rako.xml) documented for RA/RTC/WA/WTC-Bridge only, not confirmed for WRA-232. -->

## Provenance

```yaml
source_domains:
  - rakocontrols.com
  - manualmachine.com
  - scribd.com
  - wiki.london.hackspace.org.uk
source_urls:
  - https://rakocontrols.com/media/1956/accessing-the-rako-bridge-v222.pdf
  - https://rakocontrols.com/media/1315/wra232-instruction-manual.pdf
  - https://manualmachine.com/rako/wra232/2505407-user-manual/
  - https://www.scribd.com/document/830853576/accessing-the-rako-hub
  - https://wiki.london.hackspace.org.uk/view/Project:Java-Rako/Published_API
retrieved_at: 2026-05-18T10:41:50.992Z
last_checked_at: 2026-06-02T22:13:29.018Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:29.018Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP interface documented for RA/RTC/WA/WTC-Bridge and APR/WRE-Bridge products but NOT explicitly confirmed for WRA-232 in this source. UNRESOLVED: Custom String parameter (string=X&run=1) documented as WRA-232 specific but unclear if HTTP is supported on WRA-232."
- "no safety warnings or interlock procedures found in source"
- "Full RS232 command protocol details not included - refer to separate Rako RS232 Command Summary document. UNRESOLVED: XML download interface (rakobridge/rako.xml) documented for RA/RTC/WA/WTC-Bridge only, not confirmed for WRA-232."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
